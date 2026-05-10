extends CharacterBody2D

const ROTATION_SPEED = 2.0
const ACCELERATION = 300.0
const FRICTION = 0.85    # between 0 and 1 where, 0 is complete stop and 1 is slippery
const LATERAL_FRICTION = 0.05
const MAX_VELOCITY = 100.0

func _physics_process(delta: float) -> void:
	var input_dir := Input.get_axis("down", "up")
	var rotate_dir := Input.get_axis("left", "right")
	
	rotation += rotate_dir * ROTATION_SPEED * delta
	var forward = Vector2.UP.rotated(rotation)
	var right = forward.orthogonal()
	
	var forward_vel = forward * velocity.dot(forward)
	var lateral_vel = right * velocity.dot(right)
	lateral_vel *= LATERAL_FRICTION
	
	if input_dir != 0.0:
		forward_vel += forward * ACCELERATION * delta * input_dir
	else:
		forward_vel *= FRICTION
		# prevent micro sliding
		if forward_vel.length() < 5.0:
			forward_vel = Vector2.ZERO
	
	velocity = forward_vel + lateral_vel
	velocity = velocity.limit_length(MAX_VELOCITY)
	
	move_and_slide()
