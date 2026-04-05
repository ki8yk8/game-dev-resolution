extends Node2D

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	var camera = get_viewport().get_camera_2d()
	var tl = $CameraBounds/TopLeft.global_position
	var br = $CameraBounds/BottomRight.global_position
	
	camera.limit_left = tl.x
	camera.limit_top = tl.y
	camera.limit_bottom = br.y
	camera.limit_right = br.x
