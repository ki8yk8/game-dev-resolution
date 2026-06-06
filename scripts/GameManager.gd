extends Node

# Game constants
const INITIAL_HEARTS: int = 3
const INITIAL_COINS: int = 0

# glboal game state
var state = {
	"hearts": INITIAL_HEARTS,
	"coins": INITIAL_COINS,
}

func update_coins(coin: int):
	state.coins += coin

func update_hearts(hearts: int = -1):
	state.hearts += hearts

func die():
	pass
