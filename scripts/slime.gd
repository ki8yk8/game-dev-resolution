extends CharacterBody2D

@onready var animated_sprite = $AnimatedSprite2D
const SPEED = 70
var dead = false
var direction = 1

func _physics_process(delta: float) -> void:
	if dead:
		return
		
	if is_on_wall():
		direction *= -1

	if direction == 1:
		animated_sprite.flip_h = false
	else:
		animated_sprite.flip_h = true
		
	velocity.x = direction * SPEED
	velocity.y += 500 * delta
	move_and_slide()

func _on_head_collision_detect_body_entered(body: Node2D) -> void:
	$Timer.start()
	animated_sprite.play("death")
	dead = true

func _on_timer_timeout() -> void:
	$Timer.stop()
	queue_free()
