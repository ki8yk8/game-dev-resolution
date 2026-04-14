extends Node

@onready var coin_label = $CanvasLayer/Control/MarginContainer/HBoxContainer/CoinHbox/Value

func _ready():
	Controller._subscribe("game-manager.coins", update_coins)

func update_coins(value)->void:
	print("hello I waas herep  ")
	coin_label.text = "x" + str(value)

func _exit_tree() -> void:
	Controller._unsubscribe("game-manager.coins", update_coins)
