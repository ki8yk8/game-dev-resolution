extends Control

func _on_quit_button_pressed() -> void:
	# quit the game
	get_tree().quit()

func _on_play_button_pressed() -> void:
	get_tree().change_scene_to_file("res://scenes/game_play.tscn")
