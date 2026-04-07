extends Node

# game state
var _state = {
	"coins": 0,
	"health": 0,
	"level": 1,
}

# TODO: later all the signal should be combined in one 
signal _coin_update
signal _health_update
signal _level_update

# all the publisher will use this function below
func _add_coin(value: int = 1):
	_state.coins += value
	_coin_update.emit(_state.coins)

enum LevelUpdateTypes { INCREMENT, EXACT, RELOAD }
func _change_level(type: LevelUpdateTypes, value=1):
	if type == LevelUpdateTypes.INCREMENT:
		_state.level += value
	elif type == LevelUpdateTypes.EXACT:
		_state.level = value
	elif type == LevelUpdateTypes.RELOAD:
		_state.level += 0

	# publish the signal
	_level_update.emit(_state.level)
	
	# FIX: add level manager later that will handle the scenes
	get_tree().reload_current_scene()
