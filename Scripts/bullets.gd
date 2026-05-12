extends Area2D

const DEGREE_PER_SECOND = 45

func _process(delta: float) -> void:
	rotation += deg_to_rad(delta * DEGREE_PER_SECOND)
