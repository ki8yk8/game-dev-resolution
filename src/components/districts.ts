type DistrictState = "Stable" | "Tense" | "Riot" | "Recovery";

/**
 * DistricStats are the hidden variables about a district that decides the transition or the evolution of the distict to chaos. Each hidden variable signfies different concpets;
 * - infectionRate: how fast diseases are spreading there
 * - crimeIndex: organized crime presences
 * - infraHealth: how degraded the infrastructures are
 * - socialTension: public unrest or inequality pressure
 */
interface DistrictStats {
	infectionRate: number;
	crimeIndex: number;
	infraHealth: number;
	socialTension: number;
}

interface DistrictForUser {
	id: number;
	name: string;
	color: string;
	state: DistrictState;
}

/**
 * transition probability from one district state to another that controls the markov chain. This is depended on the stats of each district. If stats are worse the, probability of district being in worse state increases.
 */
type TransitionMatrix = Record<DistrictState, Record<DistrictState, number>>;

class District {
	// identity variables (public to user)
	public id: number;
	public name: string;
	public color: string;
	public state: DistrictState;

	// hidden variable; stats is what stores the state of different elements of society and controls the evolution of the district
	private stats: DistrictStats;

	// dependednt variables; not visible to user and is depended on the district stats
	private transitionMatrix: TransitionMatrix;
	private eventRate: number; // poisson's event rate that determines probability of event being fired on each tick

	constructor() {
		this.id = 0;
		this.name = "district name";
		this.color = "#fff";
		this.state = "Stable";

		/* TODO: use a random number generator to decide on the stats */
		this.stats = {
			infectionRate: 0.2,
			crimeIndex: 0.1,
			infraHealth: 0.6,
			socialTension: 0.2,
		};

		this.transitionMatrix = this.calculateTransitionMatrix();
		this.eventRate = this.calculateEventRate();
	}

	get(): DistrictForUser {
		return {
			id: this.id,
			name: this.name,
			color: this.color,
			state: this.state,
		};
	}

	calculateTransitionMatrix(): TransitionMatrix {
		/* TODO: compute the transition matrix based on the probabilities */
		return {
			Recovery: { Recovery: 0.25, Riot: 0.25, Stable: 0.25, Tense: 0.25 },
			Riot: { Recovery: 0.25, Riot: 0.25, Stable: 0.25, Tense: 0.25 },
			Stable: { Recovery: 0.25, Riot: 0.25, Stable: 0.25, Tense: 0.25 },
			Tense: { Recovery: 0.25, Riot: 0.25, Stable: 0.25, Tense: 0.25 },
		};
	}

	calculateEventRate(): number {
		/**
		 * number of k independent events in one tick
		 */
		return 2.85;
	}
}
