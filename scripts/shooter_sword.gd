extends Area2D

const VELOCITY = 50
@onready var timer:Timer = $Timer

func _ready() -> void:
	timer.start()

func _process(delta: float) -> void:
	# controls the movement
	position -= Vector2(0, VELOCITY).rotated(rotation)*delta
	
func _on_timer_timeout() -> void:
	# remove the sword on timeout
	timer.stop()
	queue_free()

func _on_body_entered(body: Node2D) -> void:
	# clear the bullet as it has hit the body
	if body is Player:
		body.hit()
	queue_free()
