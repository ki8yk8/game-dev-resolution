extends Node

var _publishers: Array[String] = [] 
var _subscribers: Array[Dictionary] = []
var _memory: Dictionary = {}
var _cache: Dictionary = {}

func _register_publisher(publisher: String) -> Callable:
	if publisher not in _publishers:
		_publishers.append(publisher)
	
	return _publish.bind(publisher)
	
func _subscribe(publisher: String, callback: Callable) -> void:
	_subscribers.append({
		"publisher": publisher,
		"callback": callback,
	})
	
func _unsubscribe(publisher: String, callback: Callable) -> void:
	_subscribers = _subscribers.filter(func (s): return not (s.get("publisher") == publisher and s.get("callback") == callback))
	
func _publish(data: Variant, publisher: String) -> void:
	# publish only when different from the cache for only the objects
	var cache = _cache.get(publisher)
	var changed = {}
	
	if publisher == "game-manager":
		print("in first", data, cache)
	if data is Dictionary:
		if cache is Dictionary:
			# only have new things in the changed
			for key in data.keys():
				if key in cache and cache[key] != data[key]:
					changed[key] = data[key]
					
			# if nothing is new then do nothing
			if len(changed.keys()) == 0:
				return
		else:
			changed = data
			
	_cache[publisher] = data.duplicate() if data is Dictionary else data
	
	if publisher == "game-manager":
		print("in second", changed)
	var subscribers = _subscribers.filter(func (s): return s.get("publisher").split(".")[0] == publisher)
	for subscriber in subscribers:
		var publisher_info = subscriber.get("publisher").split(".")
		if len(publisher_info) > 1 and publisher_info[1] in changed.keys():
			subscriber.get("callback").call(changed.get(publisher_info[1]))
		else:
			subscriber.get("callback").call(data)
		
func _memorize(item: String, value: Variant):
	_memory[item] = value
	
func _forget(item: String):
	_memory.erase(item)
