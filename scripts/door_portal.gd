extends Node2D

var doors = []

func _ready() -> void:
	var childrens = get_children()
	doors = childrens.filter(func (child):
		return child is SmallDoor or child is BigDoor or child is InvisibleDoor
	)
	# there should be always two doors. One to enter another to leave while viceversa also shall work
	assert(doors.size() == 2)
	
	# assign partner to one another
	doors[0].partner = doors[1]
	doors[1].partner = doors[0]	
