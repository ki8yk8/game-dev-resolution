extends Area2D

func _process(delta: float) -> void:
	position += Vector2(80*delta, 0).rotated(rotation)

func _on_area_entered(area: Area2D) -> void:
	if area is RayBoundary:
		queue_free()
