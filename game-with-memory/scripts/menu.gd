extends Control

@onready var coins_label = $MarginContainer/HBoxContainer/Score/Coins/Label
@onready var total_score_label = $MarginContainer/HBoxContainer/Score/TotalScore/Label
@onready var highest_score_label = $MarginContainer/HBoxContainer/Score/HighestScore/Label

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	highest_score_label.text = "Top Score: " + str(GlobalScript.highest_score)
	coins_label.text = "Coins: " + str(GlobalScript.total_coin)
	total_score_label.text = "Total Score: " + str(GlobalScript.total_score)
	GlobalScript.last_score = 0


func _on_play_pressed() -> void:
	get_tree().change_scene_to_file("res://scenes/game_play.tscn")

func _on_quit_pressed() -> void:
	get_tree().quit()
