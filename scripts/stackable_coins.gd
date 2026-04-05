extends RigidBody2D
@onready var GameHUD = %GameHUD

func _on_area_2d_body_entered(body: Node2D) -> void:
	# remove the coin
	queue_free()
	GameHUD.update_coins()	
