extends CharacterBody2D

@onready var animated_sprite = $AnimatedSprite2D
const SPEED = 70
var direction = 1

func _physics_process(delta: float) -> void:
	if is_on_wall():
		direction *= -1

	if direction == 1:
		animated_sprite.flip_h = false
	else:
		animated_sprite.flip_h = true
		
	velocity.x = direction * SPEED
	velocity.y += 500 * delta
	move_and_slide()
