extends RigidBody2D

@onready var timer:Timer = $Timer

func _process(delta: float) -> void:
	position.y += delta * 200

func _on_body_entered(body: Node2D) -> void:
	if body is Player:
		body.hit()
	elif body is SurviveAttackShield:
		timer.start()

func _on_timer_timeout() -> void:
	queue_free()
