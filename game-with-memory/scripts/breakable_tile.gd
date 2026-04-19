extends StaticBody2D

@onready var timer: Timer = $Timer

func _on_tile_head_body_entered(body: Node2D) -> void:
	if body.name != "Player":
		return
	timer.start()

func _on_tile_head_body_exited(body: Node2D) -> void:
	if body.name != "Player":
		return
	timer.stop()

func _on_timer_timeout() -> void:
	timer.stop()
	queue_free()
