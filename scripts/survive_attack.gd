extends Node2D

const SHOOTERS_IN_A_ROW:int = 12
const SHOOTER_SPACING: int = 14

var shooterRows: Array[Node] = []
@export var attackRow: PackedScene = preload("res://scenes/survive_attack_row.tscn")
@export var shooter: PackedScene = preload("res://scenes/survive_attach_shooter.tscn")
@onready var timer:Timer = $Timer

func _ready() -> void:
	var half_size: float = SHOOTERS_IN_A_ROW*SHOOTER_SPACING/2.0
		
	# spawn four attack rows and for each spawn the shooter
	for i in range(4):
		var s = attackRow.instantiate()
		shooterRows.append(s)
		add_child(s)
		
		# positioning
		s.rotation_degrees = 90*i
		match i:
			0: s.position = Vector2(0, -half_size-4)
			1: s.position = Vector2(half_size, 0)
			2: s.position = Vector2(0, half_size+4)
			3: s.position = Vector2(-half_size, 0)
		
		var actualShooters: Array[Node] = []
		for j in range(SHOOTERS_IN_A_ROW):
			var sword = shooter.instantiate()
			s.add_child(sword)
			actualShooters.append(sword)
			sword.position.x = (j*SHOOTER_SPACING) - half_size + (SHOOTER_SPACING/2.0)
		s.shooters = actualShooters

func _on_timer_timeout() -> void:
	shooterRows.pick_random().shoot()
