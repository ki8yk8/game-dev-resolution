extends Area2D

var publisher_callback
@onready var audioPlayer = $AudioStreamPlayer2D

func _ready() -> void:
	publisher_callback = Controller._register_publisher("checkpoint")
	$FlagSprite.hide()
	$GrapesSprite.show()

var grabbed = false

func _on_body_entered(body: Node2D) -> void:
	if not grabbed:
		$GrapesSprite.hide()
		$FlagSprite.show()
		publisher_callback.call(position)
		grabbed = true
		audioPlayer.play()
		return
