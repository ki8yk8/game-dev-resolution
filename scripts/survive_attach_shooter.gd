extends Node2D

@export var shooterScene: PackedScene = preload("res://scenes/survive_attack_sword.tscn")

func shoot():
	var s = shooterScene.instantiate()
	add_child(s)
