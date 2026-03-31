extends Node2D

@onready var score_label = $ScoreLabel
var score = 0

func add_coin():
	score += 1;
	score_label.text = "Congratulations! You have collected " + str(score) + " coins"  
