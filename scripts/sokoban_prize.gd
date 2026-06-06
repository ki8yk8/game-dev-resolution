extends StaticBody2D
class_name SokobanPrize

var revealPrize: bool = false
@onready var animatedSprite = $AnimatedSprite2D

func _ready():
	animatedSprite.play_backwards("open")

func _on_body_entered(body: Node2D) -> void:
	if revealPrize:
		print("You got the gun")

func openChest():
	if not revealPrize:
		revealPrize = true
		animatedSprite.play("open")
	
func closeChest():
	if revealPrize:
		revealPrize = false
		animatedSprite.play_backwards("open")
