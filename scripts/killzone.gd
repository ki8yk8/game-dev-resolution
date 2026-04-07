extends Area2D

@onready var timer = $Timer

func _on_body_entered(body: Node2D) -> void:
	if body.name == "Player":
		body.death()
		timer.start()

func _on_timer_timeout() -> void:
	GameManager._change_level(GameManager.LevelUpdateTypes.RELOAD)
