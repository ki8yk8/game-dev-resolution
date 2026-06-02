extends Area2D

func _on_body_entered(body: Node2D) -> void:
	print("hello")
	# replay the game if you got struck by the ghost
	get_tree().reload_current_scene()
