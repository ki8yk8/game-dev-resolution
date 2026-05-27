import { clamp } from "@/utils/number";
import type { DistrictStats } from "./type";

const MIN_EVENT_RATE = 0.05;
const MAX_EVENT_RATE = 6.0;
const MAX_EVENT_PER_TICKS = 10;

export class PoissionEngine {
	// poisson's event rate that determines probability of event being fired on each tick
	eventRate: number;

	constructor(stats: DistrictStats) {
		// starting value for the event rate
		this.eventRate = MIN_EVENT_RATE;

		// iterate the event rate based on the stat
		this.calculateEventRate(stats);
	}

	public calculateEventRate = (stats: DistrictStats) => {
		const lambda =
			0.2 +
			stats.infectionRate * 1.2 +
			stats.crimeIndex * 0.9 +
			(1 - stats.infraHealth) * 0.8 +
			stats.socialTension * 0.6;

		this.eventRate = clamp(lambda, MIN_EVENT_RATE, MAX_EVENT_RATE);
	};
}
