extends Node2D
class_name SurviveAttackRow

var shooters: Array[Node] = []
var warningRect: Node

@onready var shootSfx: AudioStreamPlayer2D = $shootSfx
@onready var warningSfx: AudioStreamPlayer2D = $warningSfx

func shoot():
	warningSfx.play()
	var tween = create_tween()
	tween.set_loops(5)
	tween.tween_property(warningRect, "color", Color(1.0, 0.0, 0.0, 1.0), 0.15)
	tween.tween_property(warningRect, "color", Color(0.151, 0.001, 0.0, 1.0), 0.15)
	await tween.finished
	shootSfx.play()
	for shooter in shooters:
		shooter.shoot()
