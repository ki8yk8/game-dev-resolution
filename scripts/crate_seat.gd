extends Area2D
class_name CrateSeat

# turn this true if this has a crate
var hasCrate: bool = false

func _on_body_entered(body: Node2D) -> void:
	if body is Crate:
		hasCrate = true

func _on_body_exited(body: Node2D) -> void:
	if body is Crate:
		hasCrate = false
