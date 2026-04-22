extends Control

@onready var score_label = $MarginContainer/VBoxContainer/VBoxContainer/ScoreLabel
@onready var high_score_message = $MarginContainer/VBoxContainer/VBoxContainer/HighScoreLabel
@onready var coins_label = $MarginContainer/VBoxContainer/VBoxContainer/CoinsLabel

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	var score = GlobalScript.last_score
	var coins = GlobalScript.last_coin
	
	score_label.text = "Score: "+str(score)
	coins_label.text = "Coins: "+str(coins)
	
	if score > GlobalScript.highest_score:
		high_score_message.visible = true
		GlobalScript.highest_score = score
	else:
		high_score_message.visible = false
		
	GlobalScript.total_score += score
	GlobalScript.total_coin += coins
	GlobalScript.last_score = 0
	GlobalScript.last_coin = 0


func _on_button_pressed() -> void:
	get_tree().change_scene_to_file("res://scenes/menu.tscn")
