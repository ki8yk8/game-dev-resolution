extends CharacterBody2D

const SPEED = 150.0
const ROTATION_SPEED = 2.0
const ACCELERATION = 100.0
const FRICTION = 0.6    # between 0 and 1 where, 0 is complete stop and 1 is slippery
const MAX_VELOCITY = Vector2(100.0, 100.0)

func _physics_process(delta: float) -> void:
	var input_dir := Input.get_axis("down", "up")
	var rotate_dir := Input.get_axis("left", "right")
	
	rotation += rotate_dir * ROTATION_SPEED * delta
	var direction = Vector2.UP.rotated(rotation)
	
	if input_dir != 0.0:
		velocity += direction * ACCELERATION * delta * input_dir
	else:
		velocity *= FRICTION
		# prevent micro sliding
		if velocity.length() < 5.0:
			velocity = Vector2.ZERO
	velocity = velocity.clamp(-MAX_VELOCITY, MAX_VELOCITY)
	
	move_and_slide()
