extends Node2D

@onready var timer = $Timer
@onready var marker_2d = $Marker2D

var bullets_scene: PackedScene = preload("res://Scenes/bullets.tscn")

var bullets = null

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	spawn_bullet()
	timer.start(GameManager.BULLETS_SPAWN_DELAY)

func spawn_bullet() -> void:
	if bullets == null or !is_instance_valid(bullets):
		bullets = bullets_scene.instantiate()
		bullets.global_position = marker_2d.global_position
		get_parent().add_child(bullets)

func _on_timer_timeout() -> void:
	spawn_bullet()
	timer.start(GameManager.BULLETS_SPAWN_DELAY)
