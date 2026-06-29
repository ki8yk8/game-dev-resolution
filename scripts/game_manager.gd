extends Node

const INITIAL_HEART = 3

# state of the gameplay
var _state = {
	"coins": 0,
	"hearts": INITIAL_HEART,
	"level": 0,
	"checkpoint": 0,
}

# publisher callback
var publisher_callback

func _ready() -> void:
	_state.merge(Controller._memory, true)
	# load the checkpoint 
	_state["checkpoint"] = Controller._get_initial_checkpoint(_state["level"])
	
	publisher_callback = Controller._register_publisher("game-manager")
	
	# defining the subscriptions to game entities
	Controller._subscribe("coin", update_coin)
	Controller._subscribe("killzone", handle_killzone)
	Controller._subscribe("checkpoint", handle_checkpoint)
	Controller._subscribe("heart", update_heart)
	Controller._subscribe("portal", handle_portal)
	
	# registering the last coin
	publisher_callback.call.call_deferred(_state.duplicate())
	_state.erase("checkpoint")
	
func _exit_tree() -> void:
	Controller._unsubscribe("coin", update_coin)
	Controller._unsubscribe("killzone", handle_killzone)
	Controller._unsubscribe("checkpoint", handle_checkpoint)
	Controller._subscribe("portal", handle_portal)

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
		Controller._forget("hearts")
		Controller._forget("checkpoint")   # removing the checkpoint
		print("You died")
	
func handle_checkpoint(pos: Vector2):
	Controller._memorize("checkpoint", pos)
	
func handle_portal(increment: int):
	_state["level"] += increment
