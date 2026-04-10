extends Node

# publisher callback
var publisher_callback

func _ready() -> void:
	publisher_callback = Controller._register_publisher("game-manager")
	
	# defining the subscriptions to game entities
	Controller._subscribe("coin", update_coin)
	Controller._subscribe("killzone", handle_killzone)

func _exit_tree() -> void:
	Controller._unsubscribe("coin", update_coin)
	Controller._unsubscribe("killzone", handle_killzone)

# game state
var _state = {
	"coins": 0,
	"health": 0,
	"level": 1,
}

# callback functions to handle the game state updates
func update_coin(increment):
	_state["coins"] += increment
	publisher_callback.call(_state)

# TODO: create a level manager that handles the level maangement health will be decreased by 1 
func handle_killzone(ignore):
	_state["coins"] = 0
	publisher_callback.call(_state)
	get_tree().reload_current_scene()
