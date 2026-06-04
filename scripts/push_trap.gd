extends Node2D


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	var children = get_children()
	var trapTriggers: Array[PushTrapTrigger] = children.filter(func (item):
		return item is PushTrapTrigger
	)
	var trapShooters: Array[PushTrapShooter] = children.filter(func (item):
		return item is PushTrapShooter
	)

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass
