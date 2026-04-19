extends CharacterBody2D

@onready var TopLeftMarker = %CameraMarkers/TopLeft
@onready var BottomRightMarker = %CameraMarkers/BottomRight
@onready var Camera = $Camera2D
const SPEED = 300.0
const JUMP_VELOCITY = -400.0

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
	# Add the gravity.
	if not is_on_floor():
		velocity += get_gravity() * delta

	# Handle jump.
	if Input.is_action_just_pressed("ui_accept") and is_on_floor():
		velocity.y = JUMP_VELOCITY

	# Get the input direction and handle the movement/deceleration.
	# As good practice, you should replace UI actions with custom gameplay actions.
	var direction := Input.get_axis("ui_left", "ui_right")
	if direction:
		velocity.x = direction * SPEED
	else:
		velocity.x = move_toward(velocity.x, 0, SPEED)

	move_and_slide()
