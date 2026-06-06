extends CharacterBody2D
class_name Player

const SPEED = 40.0
@onready var animatedSprite: AnimatedSprite2D = $AnimatedSprite2D
@onready var footstepSfx = $footstepSfx
@onready var deathSfx = $deathSfx
@onready var timer: Timer = $Timer
@onready var animationPLayer: AnimationPlayer = $AnimationPlayer

var lastDir = "down"
var hasGun:bool = false
var isAttacking:bool = false
var alive: bool = true
var invincible: bool = false

func _physics_process(delta: float) -> void:
	if not alive:
		return;

	var horizontalDir = Input.get_axis("left", "right")
	var verticalDir = Input.get_axis("up", "down")
	var action = Input.is_action_just_pressed("action")
	
	if action and not isAttacking:
		animatedSprite.play("attack-"+lastDir)
		isAttacking = true
		
	if isAttacking:
		move_and_slide()
		return;
	
	# if both axis movement exists then, do nothing. And same if nothing received
	if (verticalDir and horizontalDir) or (not verticalDir and not horizontalDir):
		velocity.x = move_toward(velocity.x, 0, SPEED)
		velocity.y  = move_toward(velocity.y, 0, SPEED)
		
		if not hasGun:
			animatedSprite.play("idle-"+lastDir)
		else:
			animatedSprite.play("idle-"+lastDir+"-gun")
	elif verticalDir:
		velocity.y = verticalDir * SPEED
		if verticalDir > 0:
			if hasGun:
				animatedSprite.play("walk-down-gun")
			else:
				animatedSprite.play("walk-down")
			lastDir = "down"
		else:
			if hasGun:
				animatedSprite.play("walk-up-gun")
			else:
				animatedSprite.play("walk-up")
			lastDir = "up"
	elif horizontalDir:
		velocity.x = horizontalDir * SPEED
		
		if horizontalDir>0:
			if hasGun:
				animatedSprite.play("walk-right-gun")
			else:
				animatedSprite.play("walk-right")
			lastDir = "right"
		else:
			if hasGun:
				animatedSprite.play("walk-left-gun")
			else:
				animatedSprite.play("walk-left")
			lastDir = "left"
	
	if verticalDir || horizontalDir:
		if not footstepSfx.playing:
			footstepSfx.play()
	else:
		footstepSfx.stop()
	
	if action:
		animatedSprite.play("attack-"+lastDir)
		
	move_and_slide()

func _on_animated_sprite_2d_animation_finished() -> void:
	if not alive:
		GameManager.die()
		
	if isAttacking:
		isAttacking = false

func die():
	alive = false
	animatedSprite.play("death")
	# play the death sound, when the player dies
	deathSfx.play()

func hit(heart: int = -1):
	if invincible or not alive:
		return
	# update the heart
	GameManager.update_hearts(heart)
	if GameManager.state.hearts <= 0:
		die()
	else:
		timer.start()
		invincible = true
		animationPLayer.play("invincible")

func _on_timer_timeout() -> void:
	invincible = false
	animationPLayer.play("RESET")
