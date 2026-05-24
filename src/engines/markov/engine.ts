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
		// compute based on P(A to B) = base probability * weighted contribution of hidden variable
		// -ve weight means it decrease probability of transition while, +ve indicates an increase

		// probabilty from stable to other state
		const stableToOther: Record<DistrictState, number> = {
			Stable:
				0.8 -
				stat.infectionRate * 0.3 -
				stat.crimeIndex * 0.15 -
				0.1 * stat.socialTension,
			Tense:
				0.12 +
				stat.infectionRate * 0.35 +
				stat.crimeIndex * 0.2 +
				stat.socialTension * 0.1,
			Riot: 0.0,
			Recovery: 0.08 - stat.socialTension * 0.05 + stat.infraHealth * 0.05,
		};

		// probability from tense to other state
		const tenseToOther: Record<DistrictState, number> = {
			Stable: 0.25 - stat.crimeIndex * 0.2 - stat.socialTension * 0.15,
			Tense: 0.4 - stat.infraHealth * 0.05 + stat.socialTension * 0.1,
			Riot: 0.2 + stat.crimeIndex * 0.45 + stat.socialTension * 0.3,
			Recovery: 0.15 + stat.infraHealth * 0.1 - stat.crimeIndex * 0.05,
		};

		// probability from riot to other
		const riotToOther: Record<DistrictState, number> = {
			Stable: 0.0,
			Tense: 0.15 + stat.infraHealth * 0.15 - stat.crimeIndex * 0.1,
			Riot:
				0.55 +
				stat.socialTension * 0.2 +
				stat.crimeIndex * 0.15 -
				stat.infraHealth * 0.25,
			Recovery: 0.3 + stat.infraHealth * 0.2 - stat.socialTension * 0.15,
		};

		// probability from recover to other
		const recoveryToOther: Record<DistrictState, number> = {
			Stable: 0.45 + stat.infraHealth * 0.25 - stat.infectionRate * 0.15,
			Tense: 0.12 + stat.infectionRate * 0.15 + stat.crimeIndex * 0.1,
			Riot: 0.0,
			Recovery: 0.43 - stat.infraHealth * 0.1 + stat.crimeIndex * 0.05,
		};

		return {
			Stable: this.normalizeTransition(stableToOther),
			Tense: this.normalizeTransition(tenseToOther),
			Riot: this.normalizeTransition(riotToOther),
			Recovery: this.normalizeTransition(recoveryToOther),
		};
	}

	normalizeTransition(
		transition: Record<DistrictState, number>,
	): Record<DistrictState, number> {
		const values = Object.values(transition);
		const keys = Object.keys(transition);

		const z = values.map((v) => Math.exp(v));
		const sum_z = z.reduce((prev, cur) => prev + cur);
		const p = z.map((v) => v / sum_z);

		const entries = p.map((item, index) => [keys[index], item]);

		return Object.fromEntries(entries);
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
			"Stable",
			"Tense",
			"Riot",
			"Recovery",
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
