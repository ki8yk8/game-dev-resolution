extends PathFollow2D

func _process(delta: float) -> void:
	progress_ratio += 0.05*delta
	if progress_ratio == 1:
		progress_ratio = 0
