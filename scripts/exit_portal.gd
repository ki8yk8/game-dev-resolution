extends Area2D
@onready var timer = $Timer

var publisher_callback;

func _ready() -> void:
	publisher_callback = Controller._register_publisher("portal")

func _on_body_exited(body: Node2D) -> void:
	var body_position = body.position.x
	timer.start()
	var  tween = create_tween()
	tween.tween_property(body, "position:x", 100, 0.8).as_relative()

func _on_timer_timeout() -> void:
	timer.stop()
	publisher_callback.call(1)
