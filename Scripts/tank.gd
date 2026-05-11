extends CharacterBody2D

@onready var oilspill_tilemap = $"../ObjectsMap/28x28 Tiles"
@onready var timer = $Timer

const ROTATION_SPEED = 2.0
const ACCELERATION = 300.0
const FRICTION = 0.85    # between 0 and 1 where, 0 is complete stop and 1 is slippery
const LATERAL_FRICTION = 0.05
const MAX_VELOCITY = 100.0
const SLIPPERY_TIME = 4

const BULLET_SCENE = preload("res://Scenes/bullet.tscn")

var slippery = false

func _physics_process(delta: float) -> void:
	var cell = oilspill_tilemap.local_to_map(oilspill_tilemap.to_local(global_position))
	var tile_data = oilspill_tilemap.get_cell_tile_data(cell)
	
	if tile_data:
		slippery = tile_data.get_custom_data("is_oil")
		timer.start(SLIPPERY_TIME)
		
	if slippery:
		print("Slippery")
	
	var acceleration = ACCELERATION if not slippery else ACCELERATION * 2
	var friction = FRICTION if not slippery else FRICTION * 0.5
	var lateral_friction = LATERAL_FRICTION if not slippery else LATERAL_FRICTION * 0.5
	var max_velocity = MAX_VELOCITY if not slippery else MAX_VELOCITY * 1.5
	var rotation_speed = ROTATION_SPEED if not slippery else ROTATION_SPEED * 2
	
	var input_dir := Input.get_axis("down", "up")
	var rotate_dir := Input.get_axis("left", "right")
	
	rotation += rotate_dir * rotation_speed * delta
	# manage the bullets
	if Input.is_action_just_pressed("shoot"):
		var bullet = BULLET_SCENE.instantiate()
		bullet.position = position
		bullet.rotation = rotation
		
		get_parent().add_child(bullet)
	
	# manage the motion
	var forward = Vector2.UP.rotated(rotation)
	var right = forward.orthogonal()
	
	var forward_vel = forward * velocity.dot(forward)
	var lateral_vel = right * velocity.dot(right)
	lateral_vel *= lateral_friction
	
	if input_dir != 0.0:
		forward_vel += forward * acceleration * delta * input_dir
	else:
		forward_vel *= friction
		# prevent micro sliding
		if forward_vel.length() < 5.0:
			forward_vel = Vector2.ZERO
	
	velocity = forward_vel + lateral_vel
	velocity = velocity.limit_length(max_velocity)
	
	move_and_slide()

func _on_timer_timeout() -> void:
	timer.stop()
	slippery = false
