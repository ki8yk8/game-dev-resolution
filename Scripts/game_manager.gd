extends Node

const BULLETS_SPAWN_DELAY = 10    # in seconds

var GAME_STATE = {
	"top_kills": 0,
	"highest_survived": 0,    # in seconds
	"lifetime_deaths": 0,
}

func get_game_state() -> Dictionary:
	return GAME_STATE
