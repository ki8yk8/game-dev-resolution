extends Area2D

@onready var timer = $Timer
@onready var player = %player

func _on_body_entered(body: Node2D) -> void:
	body.death()
	timer.start()

func _on_timer_timeout() -> void:
	print("You died!")
	get_tree().reload_current_scene()
	
