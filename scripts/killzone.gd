extends Area2D

@onready var timer = $Timer
var publisher_callback

func _ready() -> void:
	publisher_callback = Controller._register_publisher("killzone")

func _on_body_entered(body: Node2D) -> void:
	if body.name == "Player":
		body.death()
		timer.start()

func _on_timer_timeout() -> void:
	publisher_callback.call(true)
