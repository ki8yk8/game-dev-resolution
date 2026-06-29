extends RigidBody2D
var publisher_callback
@onready var audioPlayer:AudioStreamPlayer2D = $AudioStreamPlayer2D

func _ready() -> void:
	publisher_callback = Controller._register_publisher("coin")

func _on_area_2d_body_entered(body: Node2D) -> void:
	audioPlayer.play()
	await audioPlayer.finished
	queue_free()    # remove coin
	publisher_callback.call(2)
