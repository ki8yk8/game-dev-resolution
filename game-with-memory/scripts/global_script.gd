extends Node

var total_coin = 0
var total_score = 0
var highest_score = 0

func _game_finished(coins, score):
	total_coin += coins
	total_score += score
	highest_score = max(highest_score, score)
