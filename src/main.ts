import Clock from "./components/clock";
import Canvas from "./ui/canvas";

const root = document.getElementById("app");
if (!root) {
	throw new Error(
		"Couldn't find the root element, document.getElementById('app') is null ",
	);
}

const clock = new Clock();

Canvas({
	root,
	hudprops: {
		day: clock.tick,
		maxDay: clock.maxTick,
		budget: 0,
		credibility: 0,
		cityEntropy: 0,
	},
});
