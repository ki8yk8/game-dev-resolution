extends Node2D

@onready var camera = $Player/Camera2D
@onready var topLeftMarker = $CameraLimitMarkers/TopLeft
@onready var bottomRightMarker = $CameraLimitMarkers/BottomRight

# ui elements
@onready var coinsLabel = $UI/MarginContainer/HBoxContainer/Coins
@onready var heartsLabel = $UI/MarginContainer/HBoxContainer/Hearts
@onready var gameOverTime = $GameOverTimer

var gameStats = {
	"hearts": 3,
	"coins": 0,
}

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	# limit the camera position to the marker position
	camera.limit_left = topLeftMarker.position.x
	camera.limit_top = topLeftMarker.position.y
	camera.limit_bottom = bottomRightMarker.position.y
	camera.limit_right = bottomRightMarker.position.x

	_render()

func changeCoins(coins: int = 1):
	gameStats["coins"] += coins
	_render()
	
func changeHearts(heart: int = -1):
	gameStats["hearts"] += heart
	if gameStats.hearts <= 0:
		_death()
	
	_render()

func _death():
	gameOverTime.start()

func _render():		
	# adapt the ui according to the game stats
	coinsLabel.text = "Coins: "+str(gameStats.coins)
	heartsLabel.text = "Hearts: "+str(gameStats.hearts)

# TODO: add the scene change logic here
func _on_game_over_timer_timeout() -> void:
	pass # Replace with function body.
