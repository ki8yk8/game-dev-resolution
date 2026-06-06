extends Control

@onready var coinLabel = $VBoxContainer/VBoxContainer/Label2

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	coinLabel.text = "Coins: "+str(GameManager.state.coins)

func _on_button_pressed() -> void:
	get_tree().change_scene_to_file("res://scenes/main_menu.tscn")
