import type { DistrictState, DistrictStats } from "../components/districts";

/**
 * transition probability from one district state to another that controls the markov chain. This is depended on the stats of each district. If stats are worse the, probability of district being in worse state increases.
 */
type TransitionMatrix = Record<DistrictState, Record<DistrictState, number>>;

export class MarkovEngine {
	// depends on the stats of given district
	private transitionMatrix: TransitionMatrix;

	constructor(stat: DistrictStats) {
		this.transitionMatrix = this.calculateTransitionMatrix(stat);
	}

	calculateTransitionMatrix(stat: DistrictStats): TransitionMatrix {
		/* TODO: compute the transition matrix based on the probabilities */
		return {
			Recovery: { Recovery: 0.25, Riot: 0.25, Stable: 0.25, Tense: 0.25 },
			Riot: { Recovery: 0.25, Riot: 0.25, Stable: 0.25, Tense: 0.25 },
			Stable: { Recovery: 0.25, Riot: 0.25, Stable: 0.25, Tense: 0.25 },
			Tense: { Recovery: 0.25, Riot: 0.25, Stable: 0.25, Tense: 0.25 },
		};
	}

	nextState(currentState: DistrictState): DistrictState {
		// TODO: compute the next state based on the transition matrix
		return "Recovery";
	}

	steadyState(): Record<DistrictState, number> {
		/* TODO: compute the steady state of the system after infinite states */
		return { Recovery: 0.1, Riot: 0.4, Stable: 0.25, Tense: 0.25 };
	}
}
