extends Area2D
class_name InvisibleDoor

@onready var animatedSprite = $AnimatedSprite2D
@onready var cooldownTimer: Timer = $Timer
@onready var invisibleDoorSfx = $invisibleDoorSfx

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
	invisibleDoorSfx.play()
	
	# move the player from one poistion to another
	var tween = create_tween()
	tween.tween_property(body, "global_position", partner.global_position, 1)
	# play the animation for the partner as well
	if partner.animatedSprite:
		partner.animatedSprite.play("default")
	await tween.finished	
	
func _on_timer_timeout() -> void:
	cooldownTimer.stop()
	isCooldown = false
	invisibleDoorSfx.play()
