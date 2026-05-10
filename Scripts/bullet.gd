extends Area2D

const SPEED = 400
var velocity = Vector2.ZERO

@onready var timer = $Timer
@onready var animated_sprite = $AnimatedSprite2D
@onready var bullet_sprite = $Sprite2D

func _ready() -> void:
	# set up the velocity  for the bullet, no acceleration so velocity is always constant
	velocity = SPEED * Vector2.UP.rotated(rotation)
	timer.start()
	animated_sprite.visible = false

func _process(delta: float) -> void:
	position +=  velocity * delta

func _on_timer_timeout() -> void:
	timer.stop()
	queue_free()

func _on_body_entered(body: Node2D) -> void:
	if body.name == "Tank":
		return
	
	animated_sprite.visible = true
	bullet_sprite.visible = false
	velocity = Vector2.ZERO
	
	animated_sprite.play("default")

func _on_animated_sprite_2d_animation_finished() -> void:
	animated_sprite.visible = false
