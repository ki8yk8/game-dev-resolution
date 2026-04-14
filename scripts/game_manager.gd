extends Node

# state of the gameplay
var _state = {
	"coins": 0,
	"health": 0,
	"level": 1,
	"checkpoint": Vector2(117.0, 168.0),
}

# publisher callback
var publisher_callback

func _ready() -> void:
	_state.merge(Controller._memory, true)
	publisher_callback = Controller._register_publisher("game-manager")
	
	# registering the last coin
	publisher_callback.call(_state)
	
	# defining the subscriptions to game entities
	Controller._subscribe("coin", update_coin)
	Controller._subscribe("killzone", handle_killzone)
	Controller._subscribe("checkpoint", handle_checkpoint)

func _exit_tree() -> void:
	Controller._unsubscribe("coin", update_coin)
	Controller._unsubscribe("killzone", handle_killzone)
	Controller._unsubscribe("checkpoint", handle_checkpoint)

# callback functions to handle the game state updates
func update_coin(increment):
	_state["coins"] += increment
	publisher_callback.call(_state.duplicate())

# TODO: create a level manager that handles the level maangement health will be decreased by 1 
func handle_killzone(ignore):
	get_tree().reload_current_scene()
	Controller._memorize("health", _state.get("health", _state.get("health")-1))
	
func handle_checkpoint(pos: Vector2):
	_state["checkpoint"] = pos
	Controller._memorize("checkpoint", pos)
