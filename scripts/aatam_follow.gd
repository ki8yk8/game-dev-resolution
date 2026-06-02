extends PathFollow2D

var direction = 1

func _process(delta):
	progress_ratio += 0.1*direction*delta
	
	if progress_ratio == 1.0:
		direction = -1
	if progress_ratio == 0.0:
		direction = 1
