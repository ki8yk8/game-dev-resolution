extends Node

const INITIAL_HEART = 3
const LEVEL_START_CHECKPOINTS = {
	1: Vector2(117.0, 168.0),
}

const level = 1

# state of the gameplay
var _state = {
	"coins": 0,
	"hearts": INITIAL_HEART,
	"level": level,
	"checkpoint": LEVEL_START_CHECKPOINTS.get(1),
}

# publisher callback
var publisher_callback

func _ready() -> void:
	_state.merge(Controller._memory, true)
	publisher_callback = Controller._register_publisher("game-manager")
	
	# defining the subscriptions to game entities
	Controller._subscribe("coin", update_coin)
	Controller._subscribe("killzone", handle_killzone)
	Controller._subscribe("checkpoint", handle_checkpoint)
	Controller._subscribe("heart", update_heart)
	
	# registering the last coin
	publisher_callback.call.call_deferred(_state.duplicate())
	_state.erase("checkpoint")
	
func _exit_tree() -> void:
	Controller._unsubscribe("coin", update_coin)
	Controller._unsubscribe("killzone", handle_killzone)
	Controller._unsubscribe("checkpoint", handle_checkpoint)

# callback functions to handle the game state updates
func update_coin(increment):
	_state["coins"] += increment
	publisher_callback.call(_state)

func update_heart(increment):
	_state["hearts"] += increment
	publisher_callback.call(_state)

# TODO: create a level manager that handles the level maangement health will be decreased by 1 
func handle_killzone(ignore):
	get_tree().reload_current_scene()
	if _state.get("hearts") > 1:
		# TODO: memorize the coins as well
		Controller._memorize("hearts", _state.get("hearts")-1)
	else:
		Controller._memorize("hearts", INITIAL_HEART)
		Controller._memorize("checkpoint", LEVEL_START_CHECKPOINTS.get(level))
		print("You died")
	
func handle_checkpoint(pos: Vector2):
	Controller._memorize("checkpoint", pos)
