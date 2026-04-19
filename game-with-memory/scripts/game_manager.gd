extends Node

@onready var Chunks:Node2D = $"../Chunks"
@onready var Player:CharacterBody2D =  %Player

const CHUNK_WIDTH = 18
const CHUNK_PIXELS = CHUNK_WIDTH*16
const CHUNK_AHEAD = 3
const CHUNK_BEHIND = 1

const CHUNKS = {
	"straight": "res://scenes/chunk_straight.tscn",
	"jump-easy": "res://scenes/chunk_easy_jump.tscn",
	"obstacle-easy": "res://scenes/chunk_easy_obstacle.tscn",
	"ladder-easy": "res://scenes/chunk_ladder_easy.tscn",
	"ladder-hard": "res://scenes/chunk_ladder_hard.tscn",
	"ladder-medium": "res://scenes/chunk_ladder_medium.tscn",
	"breakable-road": "res://scenes/breakable_road.tscn",
}

var spawned_chunks: Array = []
var next_chunk_index: int = 0

# Called when the node enters the scene tree for the first time.
func _process(_delta: float) -> void:
	var playerChunkIndex = get_player_chunk_index()
	
	while next_chunk_index<=playerChunkIndex+CHUNK_AHEAD:
		spawn_chunk()
	despawn_old_chunks()

func despawn_old_chunks():
	var playerChunkIndex = get_player_chunk_index()
	
	for chunk in spawned_chunks.duplicate():
		if chunk["index"] < playerChunkIndex-CHUNK_BEHIND:
			chunk["node"].queue_free()
			spawned_chunks.erase(chunk)

func spawn_chunk():
	var key = pick_chunk_key()
	var scene = load(CHUNKS.get(key))
	var chunkNode:Node2D = scene.instantiate()
	
	chunkNode.position.x = next_chunk_index * CHUNK_PIXELS
	Chunks.add_child(chunkNode)
	spawned_chunks.append({
		"index": next_chunk_index,
		"node": chunkNode,
	})
	
	next_chunk_index += 1
	
func pick_chunk_key():
	if next_chunk_index == 0:
		return "straight"
	
	return CHUNKS.keys()[randi() % CHUNKS.size()]
	
func get_player_chunk_index()->int:
	var posX = Player.position.x
	return int(posX/CHUNK_PIXELS)
