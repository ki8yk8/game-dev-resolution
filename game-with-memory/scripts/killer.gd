extends Area2D

@onready var DeathTimer: Timer = $DeathTimer

const SPEED = 75

func _process(delta: float) -> void:
	if GlobalScript.gameplay_started:
		position.x += SPEED*delta

func _on_body_entered(body: Node2D) -> void:
	if body.name == "Player":
		body.change_animation("death")
		DeathTimer.start()
		GlobalScript.gameplay_started = false

func _on_death_timer_timeout() -> void:
	DeathTimer.stop()
	# TODO: the next scene should be displayed here
	get_tree().reload_current_scene()
