extends Area2D
class_name SmallDoor

@onready var animatedSprite: AnimatedSprite2D = $AnimatedSprite2D
@onready var cooldownTimer: Timer = $CoolDownTimer
@onready var marker: Marker2D = $Marker2D

var partner: Node2D = null
var isCooldown: bool = false

# TODO: add some cooldown peroid here
func _on_body_entered(body: Node2D) -> void:
	# if on cooldown nothing happens
	if isCooldown:
		return
	
	# start the cool down period along with for partner
	isCooldown = true
	partner.isCooldown = true
	cooldownTimer.start()
	partner.cooldownTimer.start()
	
	animatedSprite.play("default")
	await animatedSprite.animation_finished
	# move the player from one poistion to another
	body.global_position = partner.global_position

func _on_body_exited(body: Node2D) -> void:
	animatedSprite.play_backwards("default")

func _on_cool_down_timer_timeout() -> void:
	cooldownTimer.stop()
	isCooldown = false
