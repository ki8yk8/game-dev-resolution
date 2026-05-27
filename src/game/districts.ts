import { MarkovEngine } from "../engine/markov";
import { EventEngine } from "./events";
import { PoissionEngine } from "./poisson";
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

	// engines; responsible to implement different probability and mathematical concept that determines the next state of system
	private markovEngine: MarkovEngine;
	private poissionEngine: PoissionEngine;
	private eventEngine: EventEngine;

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;

		this.stats = {
			infectionRate: Math.random(),
			crimeIndex: Math.random(),
			infraHealth: Math.random(),
			socialTension: Math.random(),
		};

		// initializing markov engine
		this.markovEngine = new MarkovEngine(this.stats);
		this.state = this.markovEngine.nextState("Stable");

		// iniitalizign the poission engine
		this.poissionEngine = new PoissionEngine(this.stats);

		// initializing the event engine
		this.eventEngine = new EventEngine(this.poissionEngine.eventRate);
	}

	public update = (gameState: GameState) => {
		// fire the event if today is the event date
		if (gameState.clock.tick >= this.eventEngine.nextEventDay) {
			const event = this.eventEngine.sampleEvent(this.stats);
		}

		this.markovEngine.calculateTransitionMatrix(this.stats);
		this.poissionEngine.calculateEventRate(this.stats);

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
