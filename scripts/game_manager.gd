extends Node

var coins = 0

signal coins_changed

func add_coin(value := 1):
	coins += 1
	coins_changed.emit(coins)
