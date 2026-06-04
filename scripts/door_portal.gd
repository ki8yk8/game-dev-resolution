extends Node2D

var doors = null

func _ready() -> void:
	var childrens = get_children()
	doors = childrens.filter(func (child):
		return child is SmallDoor or child is BigDoor
	)
	# there should be always two doors. One to enter another to leave while viceversa also shall work
	assert(doors.size() == 2)
