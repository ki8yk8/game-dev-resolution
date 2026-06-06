extends Area2D
class_name SmallDoor

@onready var animatedSprite: AnimatedSprite2D = $AnimatedSprite2D
@onready var cooldownTimer: Timer = $CoolDownTimer
@onready var doorOpenSfx = $doorOpenSfx
@onready var doorCloseSfx = $doorCloseSfx

var partner: Node2D = null
var isCooldown: bool = false

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
	doorOpenSfx.play()
	await animatedSprite.animation_finished
	# move the player from one poistion to another
	var tween = create_tween()
	tween.tween_property(body, "global_position", partner.global_position, 1)
	# play the animation for the partner as well
	partner.animatedSprite.play("default")
	await tween.finished	
	
func _on_body_exited(body: Node2D) -> void:
	animatedSprite.play_backwards("default")
	doorCloseSfx.play()

func _on_cool_down_timer_timeout() -> void:
	cooldownTimer.stop()
	isCooldown = false
