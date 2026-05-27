import { MarkovEngine } from "../engine/markov";
import GameState from "./state";
import type { DistrictState, DistrictStats } from "./type";

const districtConfig: string[] = ["Eastwood", "Northgate", "Midtown", "Harbor"];

/**
 * DistricStats are the hidden variables about a district that decides the transition or the evolution of the distict to chaos. Each hidden variable signfies different concpets;
 * - infectionRate: how fast diseases are spreading there
 * - crimeIndex: organized crime presences
 * - infraHealth: how degraded the infrastructures are
 * - socialTension: public unrest or inequality pressure
 */

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

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;

		this.stats = {
			infectionRate: Math.random(),
			crimeIndex: Math.random(),
			infraHealth: Math.random(),
			socialTension: Math.random(),
		};

		this.eventRate = this.calculateEventRate();
		this.markovEngine = new MarkovEngine(this.stats);
		this.state = this.markovEngine.nextState("Stable");
	}

	public update = (gameState: GameState) => {
		// TODO: stats will be affected
		this.markovEngine.calculateTransitionMatrix(this.stats);

		// update the state of the system
		this.state = this.markovEngine.nextState(this.state);
	};

	public longForecast = () => {
		return this.markovEngine.steadyState();
	};

	public transitionMatrix = () => {
		return this.markovEngine.calculateTransitionMatrix(this.stats);
	};

	calculateEventRate(): number {
		/**
		 * number of k independent events in one tick
		 */
		return 2.85;
	}
}

export function getDistricts(): District[] {
	const districts: District[] = districtConfig.map(
		(name, index) => new District(index, name),
	);

	return districts;
}
