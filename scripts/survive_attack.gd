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
		
		# the blink thingy for warning
		var colorRect = ColorRect.new()
		colorRect.color = Color(0.151, 0.001, 0.0, 1.0)
		colorRect.size = Vector2(half_size*2, 5)
		colorRect.position = Vector2(-half_size, -8)
		s.warningRect = colorRect
		s.add_child(colorRect)
		
		var actualShooters: Array[Node] = []
		for j in range(SHOOTERS_IN_A_ROW):
			var sword = shooter.instantiate()
			s.add_child(sword)
			actualShooters.append(sword)
			sword.position.x = (j*SHOOTER_SPACING) - half_size + (SHOOTER_SPACING/2.0)
		s.shooters = actualShooters

func _on_timer_timeout() -> void:
	shooterRows.pick_random().shoot()
	timer.start()

func _on_body_entered(body: Node2D) -> void:
	if body is Player:
		timer.start()

func _on_boundary_area_entered(area: Area2D) -> void:
	if area is SurviveAttackSword:
		area.queue_free()
