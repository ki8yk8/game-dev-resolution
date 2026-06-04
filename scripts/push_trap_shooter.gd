extends Node2D
class_name PushTrapShooter

@export var shooterSword: PackedScene = preload("res://scenes/shooter_sword.tscn")

func shoot():
	var shooter = shooterSword.instantiate()
	get_tree().current_scene.add_child(shooter)
	shooter.global_position = global_position
	shooter.rotation = rotation
