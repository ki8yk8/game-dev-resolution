extends Control

@onready var top_kills_label = $MarginContainer/VBoxContainer/MarginContainer/VBoxContainer/Label2
@onready var highest_survived_label = $MarginContainer/VBoxContainer/MarginContainer/VBoxContainer/Label3
@onready var lifetime_deaths_label = $MarginContainer/VBoxContainer/MarginContainer/VBoxContainer/Label4

@onready var ip_input: LineEdit = $MarginContainer/VBoxContainer/MarginContainer2/HBoxContainer/LineEdit

func _ready() -> void:
	# TODO: add conversion of highest survived time to proper format like hour minute and seconds
	var game_state = GameManager.get_game_state()
	top_kills_label.text = "Top Kills = "+str(game_state.get("top_kills", 0))
	highest_survived_label.text = "Highest Survived = "+str(game_state.get("highest_survived", 0))+"s"
	lifetime_deaths_label.text = "Lifetime Deaths = "+str(game_state.get("lifetime_deaths", 0))

func _on_host_join_pressed() -> void:
	var success = GameManager.host_game()
	if success:
		get_tree().change_scene_to_file("res://Scenes/game_play.tscn")

func _on_client_join_pressed() -> void:
	var ip_address = ip_input.text.strip_edges()
	if ip_address == "":
		ip_address = "127.0.0.1"
	
	var success = GameManager.join_game(ip_address)
	if success:
		get_tree().change_scene_to_file("res://Scenes/game_play.tscn")

func _on_quit_pressed() -> void:
	get_tree().quit()
