import { randn } from "@/utils/number";

import type { Drivers } from "./type";
import type { DistrictStats } from "@/game/type";

const drivers: Drivers[] = ["infection", "crime", "infra"];

export class BayesEngine {
	protected driver: Drivers;
	protected prior: Record<Drivers, number>;

	constructor() {
		this.driver = drivers[randn(0, drivers.length)];

		const priorEntires = drivers.map((driver) => [driver, 1 / drivers.length]);
		this.prior = Object.fromEntries(priorEntires);
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
