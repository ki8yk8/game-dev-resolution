extends Node

const PORT = 8911
const MAX_TANKS = 4
const BULLETS_SPAWN_DELAY = 10    # in seconds

var peer: ENetMultiplayerPeer
var bullet_counter = 0
var game_scene: Node = null

var GAME_STATE = {
	"top_kills": 0,
	"highest_survived": 0,    # in seconds
	"lifetime_deaths": 0,
}

func get_game_state() -> Dictionary:
	return GAME_STATE
	
func host_game() -> bool:
	peer = ENetMultiplayerPeer.new()
	var error = peer.create_server(PORT, MAX_TANKS)
	if error != OK:
		print("Failed to connect")
		return false
		
	multiplayer.multiplayer_peer = peer
	print("Game Hosting Started", PORT)
	return true

func join_game(ip_address: String) -> bool:
	peer = ENetMultiplayerPeer.new()
	var error = peer.create_client(ip_address, PORT)
	
	if error != OK:
		print("Failed to join server")
		return false
		
	multiplayer.multiplayer_peer = peer
	print("Joining the server")
	return true

func register_game_scene(scene: Node) -> void:
	game_scene = scene
	
	if multiplayer.is_server():
		game_scene.add_tank(1)
	else:
		await get_tree().process_frame

func unregister_game_scene(scene: Node) -> void:
	if game_scene == scene:
		game_scene = null

@rpc("any_peer", "reliable")
func request_spawn() -> void:
	if not multiplayer.is_server() or game_scene == null:
		return
	
	var peer_id = multiplayer.get_remote_sender_id()
	game_scene.add_tank(peer_id)
	
func disconnect_from_game() -> void:
	if multiplayer.multiplayer_peer:
		multiplayer.multiplayer_peer.close()
		
	multiplayer.multiplayer_peer = null
	peer = null
	game_scene = null
