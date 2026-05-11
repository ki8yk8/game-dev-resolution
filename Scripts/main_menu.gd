extends Control

func _on_start_the_game_pressed() -> void:
	get_tree().change_scene_to_file("res://Scenes/game_play.tscn")

func _on_quit_pressed() -> void:
	get_tree().quit()
