/*
Ticks is the time of the system, where 1 tick spent is considered as 1 day. It also manages the state of game namely; MENU, PLAYING, PAUSED, GAMEOVER
*/

export type GAME_STATES = "MENU" | "PLAYING" | "PAUSED" | "GAMEOVER";
type SubscriberCallback = (gameState: GameState) => void;

export interface GameState {
	state: GAME_STATES;
	tick: number;
	maxTick: number;
	speedFactor: number;
}

export default class Clock {
	public tick: number;
	public maxTick: number;
	public speedFactor: number;
	public speedFactors: number[];
	public state: GAME_STATES;

	private tickDuration: number;
	private onChangeCallbacks: SubscriberCallback[];
	private tickChangeInterval: null | ReturnType<typeof setInterval>;

	constructor(
		tick: number = 0,
		tickDuration: number = 1 * 1000,
		maxTick: number = 30,
	) {
		this.tick = tick;
		this.tickDuration = tickDuration;
		this.speedFactor = 1.0;
		this.speedFactors = [1.0, 1.5, 2.0, 4.0, 0.25];
		this.maxTick = maxTick;
		this.state = "MENU";

		this.onChangeCallbacks = [];
		this.tickChangeInterval = null;
	}

	public start = (): void => {
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

		// publish the change
		this.publishChange();
	};

	public play = (): void => {
		this.state = "PLAYING";

		if (this.tickChangeInterval) {
			console.error("The game has tick interval already defined.");
			return;
		}

		this.tickChangeInterval = setInterval(
			this.updateTick,
			this.tickDuration * this.speedFactor,
		);

		// publish the change
		this.publishChange();
	};

	public pause = (): void => {
		this.state = "PAUSED";
		if (!this.tickChangeInterval) {
			console.error(
				"Could not pause the game as tickChangeInterval was not set",
			);
			return;
		}

		clearInterval(this.tickChangeInterval);
		this.tickChangeInterval = null;

		// publish the change
		this.publishChange();
	};

	public changeSpeed = (): void => {
		const speedIndex = this.speedFactors.findIndex(
			(item) => item == this.speedFactor,
		);
		const updatedSpeedIndex = (speedIndex + 1) % this.speedFactors.length;
		const speed = this.speedFactors[updatedSpeedIndex];

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

		// publish the change
		this.publishChange();
	};

	public updateTick = (increment = 1) => {
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

		// publish the change
		this.publishChange();
	};

	private publishChange() {
		// call all the subscribers
		this.onChangeCallbacks.forEach((callback) => {
			callback({
				tick: this.tick,
				state: this.state,
				maxTick: this.maxTick,
				speedFactor: this.speedFactor,
			});
		});
	}

	public subscribe = (callback: SubscriberCallback) => {
		this.onChangeCallbacks.push(callback);
	};
}
