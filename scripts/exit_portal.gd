extends Area2D
@onready var timer = $Timer

func _on_body_exited(body: Node2D) -> void:
	var body_position = body.position.x
	timer.start()
	var  tween = create_tween()
	tween.tween_property(body, "position:x", 100, 0.8).as_relative()

func _on_timer_timeout() -> void:
	print("Level Completed")
	timer.stop()
