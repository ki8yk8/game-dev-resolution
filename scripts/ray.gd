extends Area2D

var velocity: Vector2 = Vector2.RIGHT * 300.0
@onready var raycast: RayCast2D= $RayCast2D

func _physics_process(delta: float) -> void:
	raycast.target_position = velocity.normalized()*16
	position += velocity*delta

func _on_area_entered(area: Area2D) -> void:
	if area is RayBoundary:
		queue_free()

func _on_body_entered(body: Node2D) -> void:
	if body is Player:
		# player absorbs the rays
		queue_free()
	elif body is RotatingGlass:
		if raycast.is_colliding():
			var normal = raycast.get_collision_normal()
			velocity = velocity.bounce(normal)
