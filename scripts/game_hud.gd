extends Node

@onready var coin_label = $CanvasLayer/Control/MarginContainer/HBoxContainer/CoinHbox/Value

func _ready():
	GameManager.coins_changed.connect(update_coins)

func update_coins(value)->void:
	coin_label.text = "x" + str(value)
