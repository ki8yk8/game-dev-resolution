extends Control

@onready var score_label = $MarginContainer/VBoxContainer/VBoxContainer/ScoreLabel
@onready var high_score_message = $MarginContainer/VBoxContainer/VBoxContainer/HighScoreLabel

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	var score = GlobalScript.last_score
	score_label.text = "Score: "+str(score)
	
	if score > GlobalScript.highest_score:
		high_score_message.visible = true
		GlobalScript.highest_score = score
	else:
		high_score_message.visible = false
		
	GlobalScript.total_score += score
	GlobalScript.last_score = 0


func _on_button_pressed() -> void:
	get_tree().change_scene_to_file("res://scenes/menu.tscn")
