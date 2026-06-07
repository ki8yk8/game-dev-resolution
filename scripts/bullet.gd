extends Area2D
class_name Bullet

@onready var bulletTimer: Timer = $BulletTimer

func _ready() -> void:
	bulletTimer.start()

func _process(delta: float) -> void:
	position += Vector2(4, 0).rotated(rotation)

func _on_bullet_timer_timeout() -> void:
	queue_free()
