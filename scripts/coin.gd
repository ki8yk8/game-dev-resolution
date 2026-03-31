extends Area2D

@onready var gameManager = %GameManager

func _on_body_entered(body: Node2D) -> void:
	queue_free()
	gameManager.add_coin()
