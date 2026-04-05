extends Area2D

@onready var GameHUD = %GameHUD

func _on_body_entered(body: Node2D) -> void:
	queue_free()
	GameHUD.update_coins()
