/*
Ticks is the time of the system, where 1 tick spent is considered as 1 day. It also manages the state of game namely; MENU, PLAYING, PAUSED, GAMEOVER
*/

type GAME_STATES = "MENU" | "PLAYING" | "PAUSED" | "GAMEOVER";
type SubscriberCallback = (gameState: GameState) => void;

interface GameState {
	state: GAME_STATES;
	tick: number;
	maxTick: number;
}

export default class Clock {
	tick: number;
	tickDuration: number;
	speedFactor: number;
	maxTick: number;
	state: GAME_STATES;
	onChangeCallbacks: SubscriberCallback[];
	tickChangeInterval: null | ReturnType<typeof setInterval>;

	constructor(
		tick: number = 0,
		tickDuration: number = 10,
		maxTick: number = 30,
	) {
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

	start(): void {
		if (this.state !== "MENU") {
			console.error(
				`The game has already started and is in the state ${this.state}.`,
			);
			return;
		}

		// start the tick counter
		this.state = "PLAYING";
		this.tickChangeInterval = setInterval(
			this.updateTick,
			this.tickDuration * this.speedFactor,
		);
	}

	play(): void {
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

	pause(): void {
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

	changeSpeed(speed: number = 1.0): void {
		// speed cannot be negeative
		if (speed < 0.0) {
			console.error(`Spee factor cannot be negative, ${speed} < 0.0`);
			return;
		}

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
			if (this.tickChangeInterval) {
				clearInterval(this.tickChangeInterval);
				this.tickChangeInterval = null;
			}
		}

		// call all the subscribers
		this.onChangeCallbacks.forEach((callback) => {
			callback({
				tick: this.tick,
				state: this.state,
				maxTick: this.maxTick,
			});
		});
	}

	subscribe(callback: SubscriberCallback) {
		this.onChangeCallbacks.push(callback);
	}
}
