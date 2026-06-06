extends Area2D
class_name CrateSeat

var id = -1

# turn this true if this has a crate
var crateId: int = -1

func _on_body_entered(body: Node2D) -> void:
	if body is Crate and crateId == -1:
		crateId = body.id

func _on_body_exited(body: Node2D) -> void:
	if body is Crate and crateId == body.id:
		crateId = -1
