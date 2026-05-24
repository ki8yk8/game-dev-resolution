import { describe, expect, test } from "vitest";
import { DistrictStats } from "../components/districts";
import { MarkovEngine } from "../engines/markov/engine";

describe("Markov engine should handle all the state transitions", () => {
	const dummystats: DistrictStats = {
		infectionRate: 0.2,
		crimeIndex: 0.1,
		infraHealth: 0.6,
		socialTension: 0.1,
	};

	const engine = new MarkovEngine(dummystats);

	test("Next state should be able to be determined from transition matrix", () => {
		const nextState = engine.nextState("Recovery");
		console.log(nextState);
		expect(nextState).toBeOneOf(["Recovery", "Riot", "Stable", "Tense"]);
	});

	test("Steady state should give probailities of ending up in a state", () => {
		const steadyState = engine.steadyState();

		console.log(steadyState);
		expect(Object.keys(steadyState)).toEqual([
			"Stable",
			"Tense",
			"Riot",
			"Recovery",
		]);
	});
});
