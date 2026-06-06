extends Area2D

# only one should be on at a time to have the linear motion
const SPEED = 50

@onready var raycast: RayCast2D = $RayCast2D

func _process(delta: float) -> void:
	position += Vector2(SPEED, 0).rotated(rotation)*delta
	
	if raycast.is_colliding():
		print("Here")
		rotate_randomly()

func rotate_randomly():
	# random rotation angle in degrees
	var random_rotations = [90, 180, 270]
	rotation += deg_to_rad(random_rotations.pick_random())
	
func _on_body_entered(body: Node2D) -> void:
	pass
