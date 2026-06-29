extends Area2D

var publisher_callback
@onready var audioPlayer: AudioStreamPlayer2D = $AudioStreamPlayer2D

func _ready() -> void:
	publisher_callback = Controller._register_publisher("coin")

func _on_body_entered(body: Node2D) -> void:
	audioPlayer.play()
	await audioPlayer.finished
	queue_free()
	publisher_callback.call(1)
