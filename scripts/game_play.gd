extends Node2D

@onready var camera = $Player/Camera2D
@onready var topLeftMarker = $CameraLimitMarkers/TopLeft
@onready var bottomRightMarker = $CameraLimitMarkers/BottomRight

# ui elements
@onready var coinsLabel = $UI/MarginContainer/HBoxContainer/Coins
@onready var heartsLabel = $UI/MarginContainer/HBoxContainer/Hearts
@onready var gameOverTime = $GameOverTimer

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	# limit the camera position to the marker position
	camera.limit_left = topLeftMarker.position.x
	camera.limit_top = topLeftMarker.position.y
	camera.limit_bottom = bottomRightMarker.position.y
	camera.limit_right = bottomRightMarker.position.x

	_render()

# TODO: add the scene change logic here
func _on_game_over_timer_timeout() -> void:
	pass # Replace with function body.

func _death():
	gameOverTime.start()

func _render():		
	# adapt the ui according to the game stats
	coinsLabel.text = "Coins: "+str(GameManager.state.coins)
	heartsLabel.text = "Hearts: "+str(GameManager.state.hearts)
	
func _process(delta: float) -> void:
	if GameManager.state.hearts <= 0:
		_death()
	
	_render()
