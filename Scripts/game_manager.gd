extends Node

var GAME_STATE = {
	"top_kills": 0,
	"highest_survived": 0,    # in seconds
	"lifetime_deaths": 0,
}

func get_game_state() -> Dictionary:
	return GAME_STATE
