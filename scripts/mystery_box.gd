extends StaticBody2D

func _ready() -> void:
	$NonMysterySprite.hide()
	$MysterySprite.show()

# under hit area
func _on_area_2d_body_entered(body: Node2D) -> void:
	print("extra coin")
	play_hit_animation()

func play_hit_animation() -> void:
	var tween = create_tween()
	tween.tween_property($MysterySprite, "position:y", -4, 0.1).as_relative()
	tween.tween_property($NonMysterySprite, "position:y", 0, 0.2).as_relative()
	await tween.finished
	
	$MysterySprite.hide()
	$NonMysterySprite.show()
	
