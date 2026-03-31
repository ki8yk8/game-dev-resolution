extends Node2D

@onready var raycast_right = $"RayCast2D Right"
@onready var raycast_left = $"RayCast2D Left"

const SPEED = 70
var direction = 1

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass # Replace with function body.

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	if raycast_right.is_colliding():
		direction = -1
		
	if raycast_left.is_colliding():
		direction = 1
	
	position.x += SPEED * direction * delta
