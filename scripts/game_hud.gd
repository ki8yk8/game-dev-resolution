extends Node

@onready var coin_label = $CanvasLayer/Control/MarginContainer/HBoxContainer/CoinHbox/Value

func _ready():
	Controller._subscribe("game-manager", update_coins)

func update_coins(value)->void:
	coin_label.text = "x" + str(value["coins"])

func _exit_tree() -> void:
	Controller._unsubscribe("game-manager", update_coins)
