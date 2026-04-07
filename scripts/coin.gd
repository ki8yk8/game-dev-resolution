extends Area2D

func _on_body_entered(body: Node2D) -> void:
	queue_free()
	GameManager._add_coin(1)
