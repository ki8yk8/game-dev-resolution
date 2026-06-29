extends StaticBody2D

@export var coin_scene: PackedScene
@onready var audioPlayer = $AudioStreamPlayer2D
var coin_used = false

func spawn_coin():
	if coin_used:
		return
	coin_used = true
	var coin = coin_scene.instantiate()
	
	get_tree().current_scene.add_child(coin)
	coin.global_position = global_position + Vector2(0, 0)
	
	audioPlayer.play()

func _ready() -> void:
	$NonMysterySprite.hide()
	$MysterySprite.show()

# under hit area
func _on_area_2d_body_entered(body: Node2D) -> void:
	play_hit_animation()

func play_hit_animation() -> void:
	var tween = create_tween()
	tween.tween_property($MysterySprite, "position:y", -4, 0.1).as_relative()
	tween.tween_property($NonMysterySprite, "position:y", 0, 0.2).as_relative()
	await tween.finished
	
	$MysterySprite.hide()
	$NonMysterySprite.show()
	spawn_coin()
