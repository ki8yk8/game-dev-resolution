extends Node2D

@onready var timer = $StartTimer/Timer
@onready var start_label = $StartTimer/Label
@onready var score_label = $GameHUD/Control/MarginContainer/HBoxContainer/MarginContainer/ScoreHbox/Label

const START_TIMER_STATES = ["3", "2", "1", "START..."]
var start_timer_state = 0
var score = 0

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	GlobalScript.gameplay_started = false
	timer.start()
	start_label.text = START_TIMER_STATES[start_timer_state]

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	if GlobalScript.gameplay_started:
		score += 1
		score_label.text = "Score: "+str(score)

func _on_timer_timeout() -> void:
	if start_timer_state == len(START_TIMER_STATES)-1:
		timer.stop()
		start_label.queue_free()
		GlobalScript.gameplay_started = true
	else:
		start_timer_state += 1
		start_label.text = START_TIMER_STATES[start_timer_state]
