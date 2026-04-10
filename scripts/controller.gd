extends Node

var _publishers: Array[String] = [] 
var _subscribers: Array[Dictionary] = []

func _register_publisher(publisher: String) -> Callable:
	assert(publisher not in _publishers, "Publisher name is always unique")
	_publishers.append(publisher)
	
	return _publish.bind(publisher)
	
func _subscribe(publisher: String, callback: Callable) -> void:
	_subscribers.append({
		"publisher": publisher,
		"callback": callback,
	})
	
func _unsubscribe(publisher: String, callback: Callable) -> void:
	_subscribers = _subscribers.filter(func (s): return not (s.get("publisher") == publisher and s.get("callback") == callback))
	
func _publish(publisher: String, data: Variant) -> void:
	var subscribers = _subscribers.filter(func (s): return s.get("publisher") == publisher)
	for subscriber in subscribers:
		subscriber.get("callback").call(data)
