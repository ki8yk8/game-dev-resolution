extends StaticBody2D
class_name BreakableWall

func _on_area_2d_body_entered(body: Node2D) -> void:
	if body is Bullet:
		# remove the body
		queue_free()
		body.queue_free()
