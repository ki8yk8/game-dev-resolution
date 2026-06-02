extends StaticBody2D

@onready var animatedSprite: AnimatedSprite2D = $AnimatedSprite2D

func _on_collision_mat_body_entered(body: Node2D) -> void:
	animatedSprite.play("open")
