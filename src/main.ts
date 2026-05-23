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
		day: clock.tick,
		maxDay: clock.maxTick,
		budget: 0,
		credibility: 0,
		cityEntropy: 0,
	},
});

// synchronize UI with the clock ticks
clock.subscribe(canvas.onChange)

// start the game
clock.start()
