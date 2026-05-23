/*
Ticks is the time of the system, where 1 tick spent is considered as 1 day. It also manages the state of game namely; MENU, PLAYING, PAUSED, GAMEOVER
*/
export default class Clock {
	constructor(tick = 0, tickDuration = 10, maxTick = 30) {
		this.tick = tick;
		this.tickDuration = tickDuration;
		this.speedFactor = 1.0;
		this.maxTick = maxTick;
		this.state = "MENU";

		this.onChangeCallbacks = [];
		this.tickChangeInterval = null;
	}

	get ticks() {
		return this.tick;
	}

	start() {
		if (this.state !== "MENU") {
			console.error(
				`The game has already started and is in the state ${this.state}.`,
			);
			return;
		}

		// start the tick counter
		this.start = "PLAYING";
		this.tickChangeInterval = setInterval(
			this.updateTick,
			this.tickDuration * this.speedFactor,
		);
	}

	play() {
		this.state = "PLAYING";

		if (this.tickChangeInterval) {
			console.error("The game has tick interval already defined.");
			return;
		}

		this.tickChangeInterval = setInterval(
			this.updateTick,
			this.tickDuration * this.speedFactor,
		);
	}

	pause() {
		this.state = "PAUSED";
		if (!this.tickChangeInterval) {
			console.error(
				"Could not pause the game as tickChangeInterval was not set",
			);
			return;
		}

		clearInterval(this.tickChangeInterval);
		this.tickChangeInterval = null;
	}

	changeSpeed(speed = 1.0) {
		// remove the earlier interval
		if (this.tickChangeInterval) {
			clearInterval(this.tickChangeInterval);
		}

		// create the new one with scaled time
		this.speedFactor = speed;
		this.tickChangeInterval = setInterval(
			this.updateTick,
			this.tickDuration / this.speedFactor,
		);
	}

	updateTick(increment = 1) {
		this.tick += increment;

		// if the game has finished
		if (this.tick >= this.maxTick) {
			this.state = "GAMEOVER";

			// stop the ticks
			clearInterval(this.tickChangeInterval);
			this.tickChangeInterval = null;
		}

		// call all the subscribers
		for (callback in this.onChangeCallbacks) {
			callback({
				tick: this.tick,
				state: this.state,
				maxTick: this.maxTick,
			});
		}
	}

	subscribe(callback) {
		this.onChangeCallbacks.push(callback);
	}
}
