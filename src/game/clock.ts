/*
Ticks is the time of the system, where 1 tick spent is considered as 1 day. It also manages the state of game namely; MENU, PLAYING, PAUSED, GAMEOVER
*/

import type { SubscriberCallback } from "./type";

const TICK_DURATION = 10 * 1000;
const MAX_TICKS = 30;

export default class Clock {
	public tick: number;
	public maxTick: number;
	public speedFactor: number;
	public speedFactors: number[];
	public running: boolean;
	private onTick: () => void;

	private tickDuration: number;
	private onChangeCallbacks: SubscriberCallback[];
	private tickChangeInterval: null | ReturnType<typeof setInterval>;

	constructor(callback: () => void) {
		// clock states and parameters
		this.running = false;
		this.tick = 0;
		this.tickDuration = TICK_DURATION;
		this.speedFactor = 1.0;
		this.speedFactors = [1.0, 1.5, 2.0, 4.0, 0.25];
		this.maxTick = MAX_TICKS;
		this.onTick = callback;

		this.onChangeCallbacks = [];
		this.tickChangeInterval = null;
	}

	public play = (): void => {
		this.running = true;

		if (this.tickChangeInterval) {
			console.error("The game has tick interval already defined.");
			return;
		}

		this.tickChangeInterval = setInterval(
			this.updateTick,
			this.tickDuration * this.speedFactor,
		);
	};

	public pause = (): void => {
		this.running = false;
		if (!this.tickChangeInterval) {
			console.error(
				"Could not pause the game as tickChangeInterval was not set",
			);
			return;
		}

		clearInterval(this.tickChangeInterval);
		this.tickChangeInterval = null;
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
	};

	public updateTick = (increment = 1) => {
		this.tick += increment;

		// if the game has finished
		if (this.tick >= this.maxTick) {
			this.running = false;

			// stop the ticks
			if (this.tickChangeInterval) {
				clearInterval(this.tickChangeInterval);
				this.tickChangeInterval = null;
			}
		}

		// callback
		this.onTick();
	};
}
