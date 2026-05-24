import { MarkovEngine } from "../engines/markov";
import { GAME_STATES, GameState } from "./clock";

export type DistrictState = "Stable" | "Tense" | "Riot" | "Recovery";

/**
 * DistricStats are the hidden variables about a district that decides the transition or the evolution of the distict to chaos. Each hidden variable signfies different concpets;
 * - infectionRate: how fast diseases are spreading there
 * - crimeIndex: organized crime presences
 * - infraHealth: how degraded the infrastructures are
 * - socialTension: public unrest or inequality pressure
 */
export interface DistrictStats {
	infectionRate: number;
	crimeIndex: number;
	infraHealth: number;
	socialTension: number;
}

export interface DistrictForUser {
	id: number;
	name: string;
	state: DistrictState;
}

export class District {
	// identity variables (public to user)
	public id: number;
	public name: string;
	public state: DistrictState;

	// hidden variable; stats is what stores the state of different elements of society and controls the evolution of the district
	private stats: DistrictStats;

	// dependednt variables; not visible to user and is depended on the district stats
	private eventRate: number; // poisson's event rate that determines probability of event being fired on each tick

	// engines; responsible to implement different probability and mathematical concept that determines the next state of system
	private markovEngine: MarkovEngine;

	constructor(
		id: number,
		name: string,
		state: DistrictState = "Stable",
	) {
		this.id = id;
		this.name = name;
		this.state = state;

		/* TODO: use a random number generator to decide on the stats */
		this.stats = {
			infectionRate: 0.2,
			crimeIndex: 0.1,
			infraHealth: 0.6,
			socialTension: 0.2,
		};

		this.eventRate = this.calculateEventRate();
		this.markovEngine = new MarkovEngine(this.stats);
	}

	get(): DistrictForUser {
		return {
			id: this.id,
			name: this.name,
			state: this.state,
		};
	}

	public handleClockTick = (gameState: GameState) => {
		// TODO: stats will be affected
		this.markovEngine.calculateTransitionMatrix(this.stats);

		// update the state of the system
		this.state = this.markovEngine.nextState(this.state);
	};

	calculateEventRate(): number {
		/**
		 * number of k independent events in one tick
		 */
		return 2.85;
	}
}
