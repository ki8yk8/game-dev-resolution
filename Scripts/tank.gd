extends CharacterBody2D

const SPEED = 150.0
const ROTATION_SPEED = 2.0
const ACCELERATION = 100.0
const FRICTION = 8.0

func _physics_process(delta: float) -> void:
	var input_dir := Input.get_axis("up", "down")
	var rotate_dir := Input.get_axis("left", "right")
	
	rotation += rotate_dir * ROTATION_SPEED * delta
	
	# v = u + at here, v, u = is delta
	# y axis = cosine component and x axis sine component if theta is angle between the straight and the pointing directionn
	var rotation_radian = deg_to_rad(rotation)
	var a_y = ACCELERATION * cos(rotation_radian)
	var a_x = ACCELERATION * sin(rotation_radian)
	
	if input_dir != 0.0:
		velocity += Vector2(a_x, a_y) * delta * input_dir
	else:
		pass
		
	move_and_slide()
