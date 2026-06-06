extends Area2D

# only one should be on at a time to have the linear motion
const SPEED = 50
const ENRAGED_SPEED = 30
const ANGLES = [0, 90, 180, 270]

@onready var raycast: RayCast2D = $RayCast2D
@onready var cooldownTimer: Timer = $CooldownTimer
@onready var sprite2d:Sprite2D =  $Sprite2D
@onready var animationPlayer:AnimationPlayer = $AnimationPlayer
@onready var player: CharacterBody2D = %Player
@onready var growlSfx = $growlSfx

# when enraged the things becomes enlarged and starts to follow the person to kill
var enraged: bool = false

func _process(delta: float) -> void:
	if not enraged:
		position += Vector2(SPEED, 0).rotated(rotation)*delta
	else:
		rotation = position.direction_to(player.position).angle()
		position += Vector2(ENRAGED_SPEED, 0).rotated(rotation)*delta
	
	if raycast.is_colliding():
		rotate_randomly()

func rotate_randomly():
	# random rotation angle in degrees
	var random_rotations = ANGLES.filter(func (item):
		return item != rotation
	)
	rotation += deg_to_rad(random_rotations.pick_random())
	
# for the trigger collision
func _on_body_entered(body: Node2D) -> void:
	# the thing gets enraged
	animationPlayer.play("scale")
	enraged = true
	growlSfx.play()
	
	# find the nearest value and use that rotation
	var diffAngle = ANGLES.map(func (item):
		return abs(rotation-item)
	)
	var index = diffAngle.find(func (item):
		return item == diffAngle.min()
	)
	rotation = ANGLES[index]

# for the kill collision
# TODO: add the player die thing here
func _on_kill_area_body_entered(body: Node2D) -> void:
	print("You died")

func _on_cooldown_timer_timeout() -> void:
	animationPlayer.stop()
	enraged=false
	# reset the player rotation
	rotation = 0

func _on_body_exited(body: Node2D) -> void:
	# when the player moves outside the spider then, cooldown timer starts else it remains enraged
	cooldownTimer.start()
