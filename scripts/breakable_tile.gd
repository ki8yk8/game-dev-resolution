extends Node2D

@onready var timer = $Timer

func _on_area_2d_body_entered(body: Node2D) -> void:
	print("landed here")
	timer.start()

func _on_area_2d_body_exited(body: Node2D) -> void:
	timer.stop()

func _on_timer_timeout() -> void:
	queue_free()
