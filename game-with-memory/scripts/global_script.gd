extends Node

var total_coin = 0
var total_score = 0
var highest_score = 0

var last_score = 0
var last_coin = 0

var gameplay_started = false

func _game_finished(coins, score):
	total_coin += coins
	total_score += score
	highest_score = max(highest_score, score)
