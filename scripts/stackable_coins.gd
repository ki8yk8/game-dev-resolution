extends RigidBody2D
var publisher_callback

func _ready() -> void:
	publisher_callback = Controller._register_publisher("coin")

func _on_area_2d_body_entered(body: Node2D) -> void:
	queue_free()    # remove coin
	publisher_callback.call(2)
