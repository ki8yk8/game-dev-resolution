import "./style.css";
import "remixicon/fonts/remixicon.css";

import Clock from "@/game/clock";
import Canvas from "@/ui/canvas";
import { getDistricts } from "@/game/districts";
import { GameState } from "./game/state";

// global time and game management
const clock = new Clock();
const gameState = new GameState();

// render the UI
const root = document.getElementById("app");
if (!root) {
	throw new Error(
		"Couldn't find the root element, document.getElementById('app') is null ",
	);
}

// create districts
const districts = getDistricts();

const canvas = new Canvas({
	root,
	hudProps: {
		state: clock.state,
		day: clock.tick,
		maxDay: clock.maxTick,
		budget: gameState.tokens,
		credibility: 0,
		cityEntropy: 0,
		speedFactor: clock.speedFactor,
		onPlay: clock.play,
		onPause: clock.pause,
		onChangeSpeed: clock.changeSpeed,
	},
	district: districts,
});

// synchronize UI with the clock ticks
clock.subscribe(canvas.handleClockChange);
districts.forEach((district) => clock.subscribe(district.handleClockTick));

// start the game
clock.start();
