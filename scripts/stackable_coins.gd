extends RigidBody2D

func _on_area_2d_body_entered(body: Node2D) -> void:
	# remove the coin
	queue_free()
	GameManager.add_coin()
