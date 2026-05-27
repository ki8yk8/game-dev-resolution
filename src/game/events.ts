import { cumulative, EPSILON, normalize } from "@/utils/number";
import type { DistrictStats, Event } from "./type";

// weight of event refers to the weight given to the event type based on which occurence will be determined
export const EVENT_TYPES: Event[] = [
	{
		name: "Diseases Outbreak",
		raises: "infectionRate",
		raiseDelta: 0.06,

		weight(stats) {
			return 0.25 + stats.infectionRate * 1.5 - stats.infraHealth * 0.2;
		},
	},
	{
		name: "Crime",
		raises: "crimeIndex",
		raiseDelta: 0.08,

		weight(stats) {
			return (
				0.2 +
				stats.crimeIndex * 1.2 +
				stats.socialTension * 0.2 -
				stats.infraHealth * 0.2
			);
		},
	},
	{
		name: "Infrastructure Failure",
		raises: "infraHealth",
		raiseDelta: -0.08,

		weight(stats) {
			return 0.2 + stats.infraHealth * 1.2 + stats.socialTension * 0.3;
		},
	},
];

export class EventEngine {
	nextEventDay: number;

	constructor(lambda: number) {
		this.nextEventDay = Infinity;
		this.computeNextEventDay(lambda, 0);
	}

	public computeNextEventDay = (lambda: number, today: number) => {
		/**
		 * computes when the next event is to be fired. This should be ran during initialization of district and after a event have been fired.
		 */
		// uniform distribution preventing value of 0
		const u = Math.max(Math.random(), EPSILON);

		const waitingTime = -Math.log(u) / lambda;
		return today + waitingTime;
	};

	public sampleEvent = (stats: DistrictStats) => {
		const eventWeights = EVENT_TYPES.map((type) => type.weight(stats));
		const normalizedWeight = normalize(eventWeights);
		const cumWeight = cumulative(normalizedWeight);

		const rnd = Math.random();
		let index = cumWeight.findIndex((value) => rnd < value);
		if (index === -1) {
			index = cumWeight.length - 1;
		}

		return EVENT_TYPES[index];
	};

	public applyEvent = (stats: DistrictStats, event: Event): DistrictStats => {
		stats[event.raises] += event.raiseDelta;
		return { ...stats };
	};
}
