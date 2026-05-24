import "./style.css";
import "remixicon/fonts/remixicon.css";

import Clock from "./components/clock";
import Canvas from "./ui/canvas";

// global time management
const clock = new Clock();

// render the UI
const root = document.getElementById("app");
if (!root) {
	throw new Error(
		"Couldn't find the root element, document.getElementById('app') is null ",
	);
}

const canvas = new Canvas({
	root,
	hudProps: {
		state: clock.state,
		day: clock.tick,
		maxDay: clock.maxTick,
		budget: 0,
		credibility: 0,
		cityEntropy: 0,
		speedFactor: clock.speedFactor,
		onPlay: clock.play,
		onPause: clock.pause,
		onChangeSpeed: clock.changeSpeed,
	},
});

// synchronize UI with the clock ticks
clock.subscribe(canvas.onChange);

// start the game
clock.start();
