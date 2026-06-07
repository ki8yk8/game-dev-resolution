extends Area2D

@onready var timer:Timer = $Timer
var stuck: bool = false
const SPEED: int = 150

func _process(delta: float) -> void:
	if not stuck:
		position.y += SPEED*delta

func _on_body_entered(body: Node2D) -> void:
	if body is Player:
		print("Player was hit")
		body.hit()
	elif body is SurviveAttackShield:
		stuck = true
		timer.start()

func _on_timer_timeout() -> void:
	queue_free()
