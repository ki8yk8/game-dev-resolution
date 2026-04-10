extends Node

# publisher callback
var publisher_callback

func _ready() -> void:
	publisher_callback = Controller._register_publisher("game-manager")
	
	# defining the subscriptions to game entities
	Controller._subscribe("coin", update_coin)

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
