extends Area2D

@onready var DeathTimer: Timer = $DeathTimer

const SPEED = 75
var started = false

func _ready():
	DeathTimer.start()

func _process(delta: float) -> void:
	if started:
		position.x += SPEED*delta



func _on_body_entered(body: Node2D) -> void:
	if body.name == "Player":
		body.change_animation("death")
		DeathTimer.start()

func _on_death_timer_timeout() -> void:
	DeathTimer.stop()
	if started:
		get_tree().reload_current_scene()
	else:
		started = true
