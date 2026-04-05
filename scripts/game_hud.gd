extends Node

@onready var coin_label = $CanvasLayer/Control/MarginContainer/HBoxContainer/CoinHbox/Value
var coins_collected = 0

func update_coins(coins:int=1)->void:
	coins_collected += coins
	coin_label.text = "x" + str(coins_collected)
