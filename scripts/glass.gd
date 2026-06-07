extends StaticBody2D

@onready var glassSprite: Sprite2D = $GlassSprite
@onready var glassShattered: Sprite2D = $GlassShattered
@onready var collisionShape: CollisionShape2D = $CollisionShape2D

func _ready() -> void:
	glassShattered.visible = false

func shatter():
	# on shatter shatter sprite becomes visible and collision shape disappears
	glassSprite.visible = false
	glassShattered.visible = true
	collisionShape.disabled = true
