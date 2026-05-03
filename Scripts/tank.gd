extends CharacterBody2D

const SPEED = 150.0
const ROTATION_SPEED = 2.0
const ACCELERATION = 10.0
const FRICTION = 8.0

func _physics_process(delta: float) -> void:
	var input_dir := Input.get_axis("down", "top")
	var rotate_dir := Input.get_axis("left", "right")
	
	rotation += rotate_dir * ROTATION_SPEED * delta
	
	if input_dir != 0:
		velocity = velocity.lerp(transform.x * input_dir * SPEED, ACCELERATION * delta)
	else:
		velocity = velocity.lerp(Vector2.ZERO, FRICTION * delta)
		
	move_and_slide()
