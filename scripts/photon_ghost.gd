extends PathFollow2D

var direction: int = -1

func _process(delta: float) -> void:
	progress_ratio += direction*0.1*delta
	
	if progress_ratio == 1.0:
		direction = -1.0
	elif progress_ratio == 0.0:
		direction = 1.0
