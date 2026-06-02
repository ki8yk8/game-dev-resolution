extends PathFollow2D

var direction = 1;

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	progress_ratio += 0.1*direction*delta
	
	# invert the direction
	if progress_ratio == 1.0:
		direction = -1
	if progress_ratio == 0:
		direction = 1
