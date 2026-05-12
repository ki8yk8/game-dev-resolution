extends Node2D

const tank_scene: PackedScene = preload("res://Scenes/tank.tscn")
const bullet_scene: PackedScene = preload("res://Scenes/bullet.tscn")

@onready var tanks: Node2D = $Tanks
@onready var bullets: Node2D = $Bullets
@onready var spawn_markers: Node2D = $SpawnMarkers

var bullet_counter = 0

func _ready() -> void:
	multiplayer.peer_disconnected.connect(_on_peer_disconnected)
	GameManager.register_game_scene(self)

func _exit_tree() -> void:
	GameManager.unregister_game_scene(self)

func _on_peer_disconnected(peer_id: int) -> void:
	if not multiplayer.is_server():
		return
	remove_tank(peer_id)

func add_tank(peer_id: int) -> void:
	if not multiplayer.is_server():
		return
	
	var tank_name = str(peer_id)
	if tanks.has_node(tank_name):
		return
		
	var tank = tank_scene.instantiate()
	tank.name = tank_name
	tank.position = tanks.to_local(get_spawn_position(peer_id))
	
	tanks.add_child(tank)

func remove_tank(peer_id: int) -> void:
	var tank = tanks.get_node_or_null(str(peer_id))
	if tank:
		tank.queue_free()

func get_spawn_position(peer_id: int) -> Vector2:
	var points = spawn_markers.get_children()
	
	var index = (peer_id - 1) % points.size()
	return points[index].global_position

func spawn_bullet(shooter_id: int, bullet_position: Vector2, bullet_rotation: float) -> void:
	if not multiplayer.is_server():
		return
	
	bullet_counter += 1
	
	var bullet = bullet_scene.instantiate()
	bullet.name = "Bullet_"+str(bullet_counter)
	bullet.shooter_id = shooter_id
	bullet.position = bullets.to_local(bullet_position)
	bullet.rotation = bullet_rotation
	
	bullets.add_child(bullet)
