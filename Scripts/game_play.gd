extends Node2D

const BULLETS_SPAWN_TIME = 30

var bullets = preload("res://Scenes/bullets.tscn")
@onready var timer = $Timer

func _ready() -> void:
	timer.start(BULLETS_SPAWN_TIME)

# spawn say 5 bullets every spawn seconds
func _on_timer_timeout() -> void:
	var bullets_scene = bullets.instantiate()
	
