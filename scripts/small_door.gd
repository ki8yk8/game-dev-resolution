extends Area2D
class_name SmallDoor

@onready var animatedSprite: AnimatedSprite2D = $AnimatedSprite2D
var partner: Node2D = null

# TODO: add some cooldown peroid here
func _on_body_entered(body: Node2D) -> void:
	animatedSprite.play("default")

func _on_body_exited(body: Node2D) -> void:
	animatedSprite.play_backwards("default")
