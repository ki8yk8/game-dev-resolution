import type { DistrictState, DistrictStats } from "../../components/districts";
import { matMul, transpose } from "../../utils/numpy";

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
		const currentStateTransition = this.transitionMatrix[currentState];
		const [states, statesProb] = [
			Object.keys(currentStateTransition),
			Object.values(currentStateTransition),
		];

		// calculate cumulative probability
		let sumProb = 0;
		const cumProb = statesProb.map((p) => {
			sumProb += p;
			return sumProb;
		});

		const rnd = Math.random(); // between 0 and 1
		for (let i = 0; i < cumProb.length; i++) {
			if (rnd < cumProb[i]) {
				return states[i] as DistrictState;
			}
		}

		// if last item
		return states[cumProb.length - 1] as DistrictState;
	}

	transitionMatrix2Array(tm: TransitionMatrix): number[][] {
		return Object.values(tm).map((row) => Object.values(row));
	}

	array2TransitionMatrix(a: number[][]): TransitionMatrix {
		const stateOrder: DistrictState[] = [
			"Recovery",
			"Riot",
			"Stable",
			"Tense",
		] as const;

		return Object.fromEntries(
			a.map((item, index) => [
				stateOrder[index],
				Object.fromEntries(item.map((val, j) => [stateOrder[j], val])),
			]),
		) as TransitionMatrix;
	}

	steadyState(): Record<DistrictState, number> {
		const epsilon = 1e-3;
		const maxTransition = 1e3;
		let currentTransition = this.transitionMatrix2Array(this.transitionMatrix);

		let n = 0;
		while (n <= maxTransition) {
			const newTransition = matMul(currentTransition, currentTransition);

			// check if this is steady state
			const transposed = transpose(newTransition);
			const allRowEqual = transposed.map((row) => {
				const rowSub = row.map((val) => Math.abs(val - Math.max(...row)));
				for (let i = 0; i < rowSub.length; i++) {
					if (rowSub[i] > epsilon) return false;
				}

				return true;
			});

			const isSteadyState = allRowEqual.every((item) => item);
			if (isSteadyState) {
				return this.array2TransitionMatrix(newTransition)["Recovery"];
			} else {
				currentTransition = [...newTransition];
			}

			n++;
		}

		return { Recovery: -1, Riot: -1, Stable: -1, Tense: -1 };
	}
}
