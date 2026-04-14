extends Node

@onready var coin_label = $CanvasLayer/Control/MarginContainer/HBoxContainer/CoinHbox/Value
@onready var heart_label = $CanvasLayer/Control/MarginContainer/HBoxContainer/HeartHbox/Value

func _ready():
	Controller._subscribe("game-manager.coins", update_coins)
	Controller._subscribe("game-manager.hearts", update_hearts)

func update_coins(value)->void:
	coin_label.text = "x" + str(value)
	
func update_hearts(value)->void:
	heart_label.text = "x" + str(value)

func _exit_tree() -> void:
	Controller._unsubscribe("game-manager.coins", update_coins)
	Controller._unsubscribe("game-manager.hearts", update_hearts)
