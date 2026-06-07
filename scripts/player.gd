extends CharacterBody2D
class_name Player

const SPEED:float = 40.0
@onready var animatedSprite: AnimatedSprite2D = $AnimatedSprite2D
@onready var footstepSfx:AudioStreamPlayer2D = $footstepSfx
@onready var deathSfx:AudioStreamPlayer2D = $deathSfx
@onready var hurtSfx:AudioStreamPlayer2D = $hurtSfx
@onready var timer: Timer = $Timer
@onready var animationPLayer: AnimationPlayer = $AnimationPlayer
@onready var gunShootSfx: AudioStreamPlayer2D = $GunShootSfx
@onready var bulletScene: PackedScene = preload("res://scenes/bullet.tscn")

var lastDir:String = "down"
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
		var animationName = "attack-"+lastDir+"-"+("gun" if hasGun else "")
		animatedSprite.play(animationName)
		isAttacking = true
		shoot_bullet()
		
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
	hurtSfx.play()
	if GameManager.state.hearts <= 0:
		die()
	else:
		timer.start()
		invincible = true
		animationPLayer.play("invincible")

func _on_timer_timeout() -> void:
	invincible = false
	animationPLayer.play("RESET")

func shoot_bullet():
	if not gunShootSfx.playing:
		gunShootSfx.play()
	var b = bulletScene.instantiate()
	
	match lastDir:
		"up": b.rotation_degrees = -90
		"down": b.rotation_degrees = 90
		"left": b.rotation_degrees = 180
		"right": b.rotation_degrees = 0
		
	add_child(b)
