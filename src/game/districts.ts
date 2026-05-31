import { randn } from "@/utils/number";
import { MarkovEngine } from "../engine/markov";
import { EventEngine } from "./events";
import { PoissionEngine } from "./poisson";
import GameState from "./state";
import type { DistrictState, DistrictStats, OccuredEvent } from "./type";

type Drivers = "infection" | "crime" | "infra";
const drivers: Drivers[] = ["infection", "crime", "infra"];
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
	public eventLogs: OccuredEvent[];

	// hidden variable; stats is what stores the state of different elements of society and controls the evolution of the district
	public stats: DistrictStats;

	// engines; responsible to implement different probability and mathematical concept that determines the next state of system
	private markovEngine: MarkovEngine;
	private poissionEngine: PoissionEngine;
	private eventEngine: EventEngine;
	private driver: Drivers;

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;

		this.driver = drivers[randn(0, 2)];

		this.stats = {
			infectionRate: this.driver === "infection" ? 0.15 : 0.02,
			crimeIndex: this.driver === "crime" ? 0.15 : 0.02,
			infraHealth: this.driver === "infra" ? 0.15 : 0.5,
			socialTension: Math.random(),
		};

		// initializing markov engine
		this.markovEngine = new MarkovEngine(this.stats);
		this.state = this.markovEngine.nextState("Stable");
		this.eventLogs = [];

		// iniitalizign the poission engine
		this.poissionEngine = new PoissionEngine(this.stats);

		// initializing the event engine
		this.eventEngine = new EventEngine(this.poissionEngine.eventRate);
	}

	get eventRate() {
		return this.poissionEngine.eventRate;
	}

	public update = (gameState: GameState) => {
		let event_fired = false;
		// fire the event if today is the event date
		if (gameState.clock.tick >= this.eventEngine.nextEventDay) {
			const event = this.eventEngine.sampleEvent(this.stats);
			this.stats = this.eventEngine.applyEvent(this.stats, event);
			event_fired = true;

			// save the event in the history
			this.eventLogs.push({
				id: crypto.randomUUID(),
				name: event.name,
				day: gameState.clock.tick,
				handled: false,
				districtId: this.id,
				districtName: this.name,
			});
		}

		// check if there is responder and if yes, then handle the event
		const respondersAssigned = gameState.fireDepartment.districtHasResponders(
			this.id,
		);
		if (respondersAssigned > 0) {
			const unhandledEvents = this.eventLogs
				.filter((event) => !event.handled)
				.sort((item) => item.day);

			unhandledEvents.forEach((item, index) => {
				if (index < respondersAssigned) item.handled = true;
			});

			// increase the credibility
			gameState.credibility +=
				Math.min(respondersAssigned, unhandledEvents.length) * 1.0;
		}

		this.markovEngine.calculateTransitionMatrix(this.stats);
		this.poissionEngine.calculateEventRate(this.stats);
		// if the event was fired then, compute when next event shall be fired
		if (event_fired) {
			this.eventEngine.computeNextEventDay(
				this.poissionEngine.eventRate,
				gameState.clock.tick,
			);
		}

		// update the state of the system
		this.state = this.markovEngine.nextState(this.state);
	};

	public longForecast = () => {
		return this.markovEngine.steadyState();
	};

	public transitionMatrix = () => {
		return this.markovEngine.calculateTransitionMatrix(this.stats);
	};
}

export function getDistricts(): District[] {
	const districts: District[] = districtConfig.map(
		(name, index) => new District(index, name),
	);

	return districts;
}
