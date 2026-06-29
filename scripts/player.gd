extends CharacterBody2D

@onready var animated_sprite = $AnimatedSprite2D
@onready var audioPlayer = $AudioStreamPlayer2D

const SPEED = 100.0
const JUMP_VELOCITY = -250.0
var alive = true

func _ready() -> void:
	Controller._subscribe("game-manager.checkpoint", handle_player_checkpoint)
	
func _exit_tree() -> void:
	Controller._unsubscribe("game-manager.checkpoint", handle_player_checkpoint)

func handle_player_checkpoint(pos):
	position = pos + Vector2(0, -50)

func death():
	if alive:
		audioPlayer.play()
		animated_sprite.play("death")
	alive = false

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
	if is_on_floor():
		if direction == 0:
			animated_sprite.play("idle")
		else:
			animated_sprite.play("run")
	else:
		animated_sprite.play("jump")
		
	if direction > 0:
		animated_sprite.flip_h = false
	elif direction < 0:
		animated_sprite.flip_h = true
	
	if direction:
		velocity.x = direction * SPEED
	else:
		velocity.x = move_toward(velocity.x, 0, SPEED)
		
	move_and_slide()
