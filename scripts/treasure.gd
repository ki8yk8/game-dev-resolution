extends StaticBody2D

const COINS_FROM_TREASURE: int = 10
@onready var animatedSprite: AnimatedSprite2D = $AnimatedSprite2D
@onready var treasureSfx = $traasureSfx

func _on_collision_mat_body_entered(body: Node2D) -> void:
	animatedSprite.play("open")
	treasureSfx.play()
	GameManager.update_coins(COINS_FROM_TREASURE)
