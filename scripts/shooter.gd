extends Node2D

const ROTATION_SPEED = 30

@onready var raycast:Area2D = $Raycast
@onready var shootingOrigin: Marker2D = $Marker2D
@onready var fireInTheHoleSfx: AudioStreamPlayer2D = $AudioStreamPlayer2D

@export var shooter_scene: PackedScene = preload("res://scenes/shooter_sword.tscn")

func _process(delta: float) -> void:
	# rotat the raycast continuously
	raycast.rotation_degrees += ROTATION_SPEED*delta
	if raycast.rotation_degrees > 360:
		raycast.rotation_degrees = raycast.rotation_degrees-360

func _on_raycast_body_entered(body: Node2D) -> void:
	fireInTheHoleSfx.play()
	var bullet:Area2D = shooter_scene.instantiate()
	get_tree().current_scene.add_child(bullet)
	bullet.global_position = shootingOrigin.global_position
	bullet.rotation_degrees = raycast.rotation_degrees+90
