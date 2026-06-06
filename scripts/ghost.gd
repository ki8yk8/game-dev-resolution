extends Area2D

@onready var howlingSfx = $howlingSfx

func _on_body_entered(body: Node2D) -> void:
	if body is Player:
		GameManager.update_hearts(-1)

func _on_howling_collision_body_entered(body: Node2D) -> void:
	if body is Player:
		howlingSfx.play()
