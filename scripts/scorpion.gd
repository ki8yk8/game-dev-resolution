extends CharacterBody2D
class_name Scorpion

var scorpionActive: bool = true
const SPEED: float = 60.0

@onready var player: CharacterBody2D = $"../../Player"
@onready var raycast: RayCast2D = $RayCast2D
@onready var noFollowTimer: Timer = $NoFollowTimer

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
			
	if raycast.is_colliding():
		return
	
	move_and_slide()

func _on_kill_area_body_entered(body: Node2D) -> void:
	if body is Player:
		body.hit()
		noFollowTimer.start()
		scorpionActive = false

func _on_no_follow_timer_timeout() -> void:
	scorpionActive = true
