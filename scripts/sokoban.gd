extends Node2D

var crateSeats:Array[Node] = []
var crates = []
var sokobanPrize
var allCratesAreInPlace: bool = false

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	var childrens = get_children()
	var filteredChildrens = childrens.filter(func (item):
		return item is Crate or item is CrateSeat or item is SokobanPrize or item is SokobanWalls
	)
	# the childrens should be only the crate and crate seat
	assert(len(childrens) == len(filteredChildrens))
	crateSeats = filteredChildrens.filter(func (item):
		return item is CrateSeat
	)
	crates = filteredChildrens.filter(func (item):
		return item is Crate
	)
	# the number of creates and the crate seat should always be equal
	assert(len(crates) == len(crateSeats))
	
	var sokobanPrizes = filteredChildrens.filter(func (item):
		return item is SokobanPrize
	)
	# there can be only one sokoban prize
	assert(len(sokobanPrizes) == 1)
	sokobanPrize = sokobanPrizes[0]

func _process(delta: float) -> void:
	# check if all the crates has been fulfilled or not
	allCratesAreInPlace = crateSeats.all(func (item):
		return item.hasCrate
	)
	
	if allCratesAreInPlace:
		sokobanPrize.openChest()
	else:
		sokobanPrize.closeChest()
