extends Node2D
class_name SurviveAttackRow

var shooters: Array[Node] = []

func _ready() -> void:
	var children = get_children()
	var pushTrapShooterChildren = children.filter(func (item):
		return item is PushTrapShooter
	)
	assert(len(pushTrapShooterChildren) > 0)
	shooters = pushTrapShooterChildren

func shoot():
	for shooter in shooters:
		shooter.shoot()
