extends Area2D

func _process(delta: float) -> void:
	position += Vector2(80*delta, 0).rotated(rotation)
