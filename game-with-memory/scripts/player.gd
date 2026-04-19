extends CharacterBody2D

@onready var TopLeftMarker = %CameraMarkers/TopLeft
@onready var BottomRightMarker = %CameraMarkers/BottomRight
@onready var Camera = $Camera2D

const SPEED = 100.0
const JUMP_VELOCITY = -225.0

func _ready() -> void:
	# utilizing the camera markers fix the camera boundaries
	var topLeftPos = TopLeftMarker.position
	var bottomRightPos = BottomRightMarker.position
	
	# limiting the camera position based on the marker position
	Camera.limit_top = topLeftPos[1]
	Camera.limit_left = topLeftPos[0]
	Camera.limit_bottom = bottomRightPos[1]
	Camera.limit_right = bottomRightPos[0]

func _physics_process(delta: float) -> void:
	# creating the gravity 
	if not is_on_floor():
		velocity += get_gravity() * delta

	# handling the jump
	if Input.is_action_just_pressed("jump") and is_on_floor():    
		velocity.y = JUMP_VELOCITY

	# constant forward movement of the player
	velocity.x = SPEED

	move_and_slide()
