extends Node2D


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	var children = get_children()
	var trapTriggers = children.filter(func (item):
		return item is PushTrapTrigger
	)
	var trapShooters = children.filter(func (item):
		return item is PushTrapShooter
	)
	
	# trigger should know the shooters
	for trapTrigger in trapTriggers:
		trapTrigger.shooters = trapShooters
