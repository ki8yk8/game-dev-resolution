extends Node2D
class_name SurviveAttackRow

var shooters: Array[Node] = []

func shoot():
	for shooter in shooters:
		shooter.shoot()
