extends Area2D

var publisher_callback

func _ready() -> void:
	publisher_callback = Controller._register_publisher("coin")

func _on_body_entered(body: Node2D) -> void:
	queue_free()
	publisher_callback.call(1)
