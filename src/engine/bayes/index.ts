import { randn } from "@/utils/number";

import type { Belief, Clue, Driver } from "./type";
import type { DistrictStats } from "@/game/type";

const drivers: Driver[] = ["infection", "crime", "infra"];

export class BayesEngine {
	// the culprit behind the chaos of the system. User is rewarded if he finds the culprit
	protected driver: Driver;

	// priod or the belief of the user
	protected belief: Belief;

	// likelihood represents the probability of the clue given the driver
	protected likelihood: Record<Clue, Record<Driver, number>>;

	constructor() {
		this.driver = drivers[randn(0, drivers.length)];

		// initially the belief is equal for all the driver
		const beliefEntires = drivers.map((driver) => [driver, 1 / drivers.length]);
		this.belief = Object.fromEntries(beliefEntires);

		// assigning likelihood manual
		this.likelihood = {
			disease_outbreak: {
				crime: 0.1,
				infection: 0.85,
				infra: 0.3,
			},
			criminal_activity: {
				crime: 0.85,
				infection: 0.05,
				infra: 0.15,
			},
			infrastrucure_failure: {
				crime: 0.15,
				infection: 0.05,
				infra: 0.85,
			},
		};
	}

	public driverBasedStats = (): DistrictStats => {
		return {
			infectionRate: this.driver === "infection" ? 0.15 : 0.02,
			crimeIndex: this.driver === "crime" ? 0.15 : 0.02,
			infraHealth: this.driver === "infra" ? 0.15 : 0.5,
			socialTension: Math.random(),
		};
	};
}
