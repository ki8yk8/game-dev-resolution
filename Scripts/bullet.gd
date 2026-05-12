extends Area2D

const SPEED = 400.0
const LIFE_TIME = 2.0

var shooter_id: int = -1
var velocity: Vector2 = Vector2.ZERO
var exploded: bool = false

@onready var timer: Timer = $Timer
@onready var animated_sprite: AnimatedSprite2D = $AnimatedSprite2D
@onready var bullet_sprite: Sprite2D = $Sprite2D

func _ready() -> void:
	# set up the velocity  for the bullet, no acceleration so velocity is always constant
	velocity = SPEED * Vector2.UP.rotated(rotation)
	
	animated_sprite.visible = false
	bullet_sprite.visible = true
	
	if multiplayer.is_server():
		timer.start(LIFE_TIME)

func _physics_process(delta: float) -> void:
	if not multiplayer.is_server():
		return
		
	if exploded:
		return
		
	global_position += velocity * delta

func _on_timer_timeout() -> void:
	if not multiplayer.is_server():
		return
	
	queue_free()

func get_random_animation() -> String:
	if randf() > 0.5:
		return "variant"
	return "default"

func _on_body_entered(body: Node2D) -> void:
	if not multiplayer.is_server() or exploded:
		return
	
	if body.is_in_group("tanks"):
		if not body.has_method("get_player_id"):
			return
		
		var hit_player_id: int = body.get_player_id()
		if hit_player_id == shooter_id:
			return
			
		if body.has_method("server_die"):
			body.server_die()
			
	_play_explosion_for_everyone.rpc()
	
@rpc("authority", "call_local", "reliable")
func _play_explosion_for_everyone():
	exploded = true
	animated_sprite.visible = true
	bullet_sprite.visible = false
	velocity = Vector2.ZERO
	
	animated_sprite.play(get_random_animation( ))

func _on_animated_sprite_2d_animation_finished() -> void:
	if multiplayer.is_server():
		queue_free()
