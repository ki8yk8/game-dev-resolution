extends StaticBody2D

func _on_area_2d_body_entered(body: Node2D) -> void:
	if body is Bullet:
		# remove the body
		queue_free()
		body.queue_free()
