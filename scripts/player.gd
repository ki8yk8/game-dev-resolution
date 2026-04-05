extends CharacterBody2D

@onready var animated_sprite = $AnimatedSprite2D

const SPEED = 100.0
const JUMP_VELOCITY = -250.0
var alive = true

var rock_on_head = null
# for detecting collision on top of head
func _on_area_2d_body_entered(body: Node2D) -> void:
	if body is RigidBody2D and body.is_in_group("rock"):
		print("Ouch, it hit my head")
		rock_on_head = body
		body.freeze = true # stops the gravity and physics of the rock
		#body.global_position = global_position + Vector2(0, -30)

func death():
	alive = false
	animated_sprite.play("death")

func _physics_process(delta: float) -> void:
	# Add the gravity.
	if not is_on_floor():
		velocity += get_gravity() * delta
		
	if !alive:
		return

	# Handle jump.
	if Input.is_action_just_pressed("jump") and is_on_floor():
		velocity.y = JUMP_VELOCITY
	
	if !is_on_floor():
		animated_sprite.play("jump")
		
	# directon = -ve, 0, +ve
	var direction := Input.get_axis("move_left", "move_right")

	#change the facing of the sprite
	if not rock_on_head:
		if is_on_floor():
			if direction == 0:
				animated_sprite.play("idle")
			else:
				animated_sprite.play("run")
		else:
			animated_sprite.play("jump")
	else:
		animated_sprite.play("hit")
		
	if direction > 0:
		animated_sprite.flip_h = false
	elif direction < 0:
		animated_sprite.flip_h = true
	
	if direction:
		velocity.x = direction * SPEED
	else:
		velocity.x = move_toward(velocity.x, 0, SPEED)
	

	move_and_slide()
	
	if rock_on_head:
		rock_on_head.global_position = global_position + Vector2(-16, 4)
	
	# applying impulse to the rocks
	for i in get_slide_collision_count():
		var col = get_slide_collision(i)
		var body = col.get_collider()
		
		if col.get_collider() is RigidBody2D and body.is_in_group("rock"):
			var normal = col.get_normal()
			body.apply_central_impulse(-normal*5.0)
