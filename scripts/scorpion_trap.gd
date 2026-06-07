extends Area2D

@onready var glass1 = $Glasses/Glass2
@onready var glass2 = $Glasses/Glass3
@onready var glass3 = $Glasses/Glass4
@onready var glass4 = $Glasses/Glass5
@onready var stayTimer:Timer = $StayTimer

const THRESHOLD = 3.0

var timeElpased: float = 0.0
var playerInside: bool = false
var shattered: bool = false

func _process(delta: float) -> void:
	if playerInside and not shattered:
		timeElpased += delta
	
	if timeElpased > THRESHOLD:
		_shatter_and_release()

func _shatter_and_release():
	var glasses = [glass1, glass2, glass3, glass4]
	for glass in glasses:
		glass.shatter()

func _on_body_entered(body: Node2D) -> void:
	if body is Player:
		playerInside = true

func _on_body_exited(body: Node2D) -> void:
	if body is Player:
		playerInside = false
