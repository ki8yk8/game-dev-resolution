extends Node2D

@export var rayScene: PackedScene = preload("res://scenes/ray.tscn")
@onready var timer: Timer = $Timer

var disabled: bool = false

func _ready() -> void:
	timer.start()

func _on_timer_timeout() -> void:
	if not disabled:
		timer.start()
		var ray = rayScene.instantiate()
		add_child(ray)
