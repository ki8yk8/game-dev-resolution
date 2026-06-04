extends Area2D
class_name PushTrapTrigger

var shooters = []
var cooldown: bool = false

@onready var timer = $Timer

func _on_body_entered(body: Node2D) -> void:
	# if this is cooldown then, donot do anythng
	if cooldown:
		return
	# cooldown activates; after time is over turnoff the cooldown
	cooldown = true
	timer.start()
	
	# shoot from each shooter
	for shooter in shooters:
		shooter.shoot()

func _on_timer_timeout() -> void:
	cooldown = false
