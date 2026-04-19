extends CharacterBody2D

@onready var TopLeftMarker = %CameraMarkers/TopLeft
@onready var BottomLeftMarker = %CameraMarkers/BottomLeft
@onready var Camera = $Camera2D
@onready var AnimatedSprite: AnimatedSprite2D = $AnimatedSprite2D
@onready var StartTimer: Timer = $Timer

const SPEED = 100.0
const JUMP_VELOCITY = -225.0
var player_start = false

func _ready() -> void:
	# utilizing the camera markers fix the camera boundaries
	var topLeftPos = TopLeftMarker.position
	var bottomLeftPos = BottomLeftMarker.position
	
	# limiting the camera position based on the marker position
	Camera.limit_top = topLeftPos[1]
	Camera.limit_left = topLeftPos[0]
	Camera.limit_bottom = bottomLeftPos[1]
	StartTimer.start()
	change_animation("default")

func _physics_process(delta: float) -> void:
	# creating the gravity 
	if not is_on_floor():
		velocity += get_gravity() * delta

	# handling the jump
	if Input.is_action_just_pressed("jump") and is_on_floor():    
		velocity.y = JUMP_VELOCITY
	
	# constant forward movement of the player if the timer has exhausted
	if Input.is_action_pressed("right"):
		velocity.x = SPEED
		AnimatedSprite.flip_h = false
	elif Input.is_action_pressed("left"):
		velocity.x = -SPEED
		AnimatedSprite.flip_h = true
	else:
		velocity.x = move_toward(velocity.x, 0, SPEED)

	move_and_slide()


func change_animation(anim_name: String):
	AnimatedSprite.play(anim_name)


func _on_timer_timeout() -> void:
	StartTimer.stop()
	player_start = true
	change_animation("run")
