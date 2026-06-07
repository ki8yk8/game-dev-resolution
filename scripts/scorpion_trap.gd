extends Area2D

@onready var glass1 = $Glasses/Glass2
@onready var glass2 = $Glasses/Glass3
@onready var glass3 = $Glasses/Glass4
@onready var glass4 = $Glasses/Glass5
@onready var stayTimer:Timer = $StayTimer
@onready var glassShatterSfx: AudioStreamPlayer2D = $glassShatter
@onready var scorpion: Node = $Scorpion

const THRESHOLD = 3.0

var timeElpased: float = 0.0
var playerInside: bool = false
var shattered: bool = false

func _process(delta: float) -> void:
	if playerInside and not shattered:
		timeElpased += delta
	
	if timeElpased > THRESHOLD and not shattered:
		glassShatterSfx.play()
		_shatter_and_release()

func _shatter_and_release():
	shattered = true
	var glasses = [glass1, glass2, glass3, glass4]
	for glass in glasses:
		glass.shatter()
	scorpion.scorpionActive = true

func _on_body_entered(body: Node2D) -> void:
	if body is Player:
		playerInside = true

func _on_body_exited(body: Node2D) -> void:
	if body is Player:
		playerInside = false
