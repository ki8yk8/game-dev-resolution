extends Area2D

# only one should be on at a time to have the linear motion
const SPEED = 50

@onready var raycast: RayCast2D = $RayCast2D
@onready var cooldownTimer: Timer = $CooldownTimer
@onready var sprite2d:Sprite2D =  $Sprite2D
@onready var animationPlayer:AnimationPlayer = $AnimationPlayer

# when enraged the things becomes enlarged and starts to follow the person to kill
var enraged: bool = false

func _process(delta: float) -> void:
	position += Vector2(SPEED, 0).rotated(rotation)*delta
	
	if raycast.is_colliding():
		rotate_randomly()

func rotate_randomly():
	# random rotation angle in degrees
	var random_rotations = [90, 180, 270]
	rotation += deg_to_rad(random_rotations.pick_random())
	
# for the trigger collision
func _on_body_entered(body: Node2D) -> void:
	# the thing gets enraged
	cooldownTimer.start()
	animationPlayer.play("scale")

# for the kill collision
# TODO: add the player die thing here
func _on_kill_area_body_entered(body: Node2D) -> void:
	print("You died")

func _on_cooldown_timer_timeout() -> void:
	animationPlayer.stop()
