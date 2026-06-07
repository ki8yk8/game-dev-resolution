extends CharacterBody2D
class_name Scorpion

var scorpionActive: bool = true
const SPEED: float = 80.0

@onready var player: CharacterBody2D = $"../../Player"

func _process(delta: float) -> void:
	if not scorpionActive:
		look_at(player.global_position)

func _physics_process(delta: float) -> void:
	if not scorpionActive:
		return
	
	var horizontalDir = Input.get_axis("left", "right")
	var verticalDir = Input.get_axis("up", "down")
	
	if (horizontalDir and verticalDir) or (not horizontalDir and not verticalDir):
		velocity.x = move_toward(velocity.x, 0, SPEED)
		velocity.y = move_toward(velocity.y, 0, SPEED)
	elif horizontalDir:
		velocity.x = SPEED * horizontalDir
		if horizontalDir == -1:
			rotation_degrees = 180
		else:
			rotation_degrees = 0
	elif verticalDir:
		velocity.y = SPEED * verticalDir
		if verticalDir == -1:
			rotation_degrees = 270
		else:
			rotation_degrees = 90
			
	move_and_slide()
