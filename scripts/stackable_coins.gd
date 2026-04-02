extends RigidBody2D

@onready var gameManager = %GameManager

func _on_body_entered(body: Node) -> void:
	print("collision with a body" )
