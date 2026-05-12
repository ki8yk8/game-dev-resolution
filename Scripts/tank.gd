extends CharacterBody2D

@onready var camera_2d:Camera2D = $Camera2D
@onready var collision_shape:CollisionShape2D = $CollisionShape2D
@onready var muzzle:Marker2D = $MuzzleMarker
@onready var timer = $Timer

@onready var oilspill_tilemap = get_tree().current_scene.get_node_or_null("ObjectsMap/28x28 Tiles")
@onready var bullet_label:Label = get_tree().current_scene.get_node_or_null("HUDCanvas/MarginContainer/HBoxContainer/BulletLabel") as Label

var slippery = false

const ROTATION_SPEED = 2.0
const ACCELERATION = 300.0
const FRICTION = 0.85    # between 0 and 1 where, 0 is complete stop and 1 is slippery
const LATERAL_FRICTION = 0.05
const MAX_VELOCITY = 100.0
const SLIPPERY_TIME = 4

const INITIAL_BULLETS = 100
const BULLETS_RECEIVED = 100
const MAX_BULLETS = 200

@export var alive = true
@export var bullets = INITIAL_BULLETS

# server variables
var server_input_dir = 0.0
var server_rotate_dir = 0.0

func _ready() -> void:
	add_to_group("tanks")
	
	if is_local_player():
		camera_2d.current = true
	else:
		camera_2d.enabled = false

func _process(delta: float) -> void:
	_apply_alive_state()
	
	if is_local_player() and bullet_label:
		bullet_label.text = "Bullets = "+str(bullets)+"/"+str(MAX_BULLETS)
 
func _physics_process(delta: float) -> void:
	if is_local_player():
		_handle_local_input()
		
	if multiplayer.is_server():
		_server_physics_process(delta)

func _handle_local_input() -> void:
	var input_dir = Input.get_axis("down", "up")
	var rotate_dir = Input.get_axis("left", "right")
	
	if multiplayer.is_server():
		server_input_dir = input_dir
		server_rotate_dir = rotate_dir
	else:
		send_input_to_server.rpc_id(1, input_dir, rotate_dir)
	
	if Input.is_action_just_pressed("shoot"):
		if multiplayer.is_server():
			_server_try_shoot()
		else:
			request_shoot.rpc_id(1)

@rpc("any_peer", "call_remote", "unreliable")
func send_input_to_server(input_dir: float, rotate_dir: float) -> void:
	if not multiplayer.is_server():
		return
		
	var sender_id = multiplayer.get_remote_sender_id()
	# prevent one client to control other's tank
	if sender_id != get_player_id():
		return
		
	server_input_dir = input_dir
	server_rotate_dir = rotate_dir

@rpc("any_peer", "call_remote", "reliable")
func request_shoot() -> void:
	if not multiplayer.is_server():
		return
		
	var sender_id = multiplayer.get_remote_sender_id()
	# prevent shooting from other tanks
	if sender_id != get_player_id():
		return
	
	_server_try_shoot()

func _server_physics_process(delta: float) -> void:
	if not alive:
		velocity = Vector2.ZERO
		return
	
	if oilspill_tilemap:
		var cell = oilspill_tilemap.local_to_map(oilspill_tilemap.to_local(global_position))
		var tile_data = oilspill_tilemap.get_cell_tile_data(cell)
		
		if tile_data:
			slippery = tile_data.get_custom_data("is_oil")
			timer.start(SLIPPERY_TIME)

	var acceleration = ACCELERATION if not slippery else ACCELERATION * 2
	var friction = FRICTION if not slippery else FRICTION * 0.5
	var lateral_friction = LATERAL_FRICTION if not slippery else LATERAL_FRICTION * 0.5
	var max_velocity = MAX_VELOCITY if not slippery else MAX_VELOCITY * 1.5
	var rotation_speed = ROTATION_SPEED if not slippery else ROTATION_SPEED * 2
	
	rotation += server_rotate_dir * rotation_speed * delta
	
	# manage the motion
	var forward = Vector2.UP.rotated(rotation)
	var right = forward.orthogonal()
	
	var forward_vel = forward * velocity.dot(forward)
	var lateral_vel = right * velocity.dot(right)
	lateral_vel *= lateral_friction
	
	if server_input_dir != 0.0:
		forward_vel += forward * acceleration * delta * server_input_dir
	else:
		forward_vel *= friction
		# prevent micro sliding
		if forward_vel.length() < 5.0:
			forward_vel = Vector2.ZERO
	
	velocity = forward_vel + lateral_vel
	velocity = velocity.limit_length(max_velocity)
	
	move_and_slide()

func _server_try_shoot() -> void:
	if not multiplayer.is_server() or not alive:
		return
		
	if bullets <= 0:
		# TODO: play khach khach sound
		return
	
	bullets -= 1
	var main = get_tree().current_scene
	main.spawn_bullet(get_player_id(), muzzle.global_position, global_rotation)

func server_die() -> void:
	if not multiplayer.is_server() or not alive:
		return

	alive = false
	velocity = Vector2.ZERO
	server_input_dir = 0.0
	server_rotate_dir = 0.0
	
	await get_tree().create_timer(2.0).timeout
	
	var main = get_tree().current_scene
	global_position = main.get_spawn_position(get_player_id())
	rotation = 0.0
	alive = true

func _apply_alive_state() -> void:
	visible = alive
	collision_shape.set_deferred("disabled", not alive)

func _on_timer_timeout() -> void:
	if not multiplayer.is_server():
		return
	
	timer.stop()
	slippery = false

func _on_area_2d_area_entered(area: Area2D) -> void:
	if not multiplayer.is_server():
		return
	
	if area.is_in_group("bullet_pickup"):
		area.queue_free()
		bullets = clamp(bullets+BULLETS_RECEIVED, 0, MAX_BULLETS)

func is_local_player() -> bool:
	if not name.is_valid_int():
		return false
	
	return name.to_int() == multiplayer.get_unique_id()

func get_player_id() -> int:
	if not name.is_valid_int():
		return 0
		
	return name.to_int()
