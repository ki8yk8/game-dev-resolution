extends Control

@onready var coins_label = $MarginContainer/VBoxContainer/HBoxContainer/Score/Coins/Label
@onready var total_score_label = $MarginContainer/VBoxContainer/HBoxContainer/Score/TotalScore/Label
@onready var highest_score_label = $MarginContainer/VBoxContainer/HBoxContainer/Score/HighestScore/Label
@onready var name_label = $MarginContainer/VBoxContainer/NameLabel
@onready var http_request = $HTTPRequest

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	highest_score_label.text = "Top Score: " + str(GlobalScript.highest_score)
	coins_label.text = "Coins: " + str(GlobalScript.total_coin)
	total_score_label.text = "Total Score: " + str(GlobalScript.total_score)
	GlobalScript.last_score = 0
	GlobalScript.last_coin = 0
	
	# creating http request for the name
	http_request.request("https://random-word-api.herokuapp.com/word")

func _on_play_pressed() -> void:
	get_tree().change_scene_to_file("res://scenes/game_play.tscn")

func _on_quit_pressed() -> void:
	get_tree().quit()


func _on_http_request_request_completed(result: int, response_code: int, headers: PackedStringArray, body: PackedByteArray) -> void:
	if response_code == 200:
		var json = JSON.parse_string(body.get_string_from_utf8())
		var word = json[0]
		name_label.text = "Hey, "+word+" !!"
	else:
		name_label.text = "Couldn't fetch the name."
