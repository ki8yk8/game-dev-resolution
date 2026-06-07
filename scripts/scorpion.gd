extends CharacterBody2D
class_name Scorpion

var scorpionActive: bool = false

@onready var player: CharacterBody2D = $"../../Player"

func _process(delta: float) -> void:
	look_at(player.global_position)
