import type { Event } from "./type";

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
