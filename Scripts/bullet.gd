extends Area2D

const SPEED = 400
var velocity = Vector2.ZERO

@onready var timer = $Timer

func _ready() -> void:
	# set up the velocity  for the bullet, no acceleration so velocity is always constant
	velocity = SPEED * Vector2.UP.rotated(rotation)
	timer.start()

func _process(delta: float) -> void:
	position +=  velocity * delta

func _on_timer_timeout() -> void:
	timer.stop()
	queue_free()
