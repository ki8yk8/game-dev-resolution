extends Node2D

@onready var camera = $Player/Camera2D
@onready var topLeftMarker = $CameraLimitMarkers/TopLeft
@onready var bottomRightMarker = $CameraLimitMarkers/BottomRight

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	# limit the camera position to the marker position
	camera.limit_left = topLeftMarker.position.x
	camera.limit_top = topLeftMarker.position.y
	camera.limit_bottom = bottomRightMarker.position.y
	camera.limit_right = bottomRightMarker.position.x

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass
