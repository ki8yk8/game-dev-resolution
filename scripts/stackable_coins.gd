extends RigidBody2D

func _on_area_2d_body_entered(body: Node2D) -> void:
	queue_free()    # remove coin
	GameManager._add_coin(1)    # publish the event
