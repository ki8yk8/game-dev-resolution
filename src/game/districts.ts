import { Clue, Driver } from "@/engine/bayes/type";
import { MarkovEngine } from "../engine/markov";
import { EventEngine } from "./events";
import { PoissionEngine } from "./poisson";
import GameState from "./state";
import type { DistrictState, DistrictStats, OccuredEvent } from "./type";
import { BayesEngine } from "@/engine/bayes";

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

	// if any arrest has been performed in this district or not
	public arrest: Driver | null;

	// engines; responsible to implement different probability and mathematical concept that determines the next state of system
	private markovEngine: MarkovEngine;
	private poissionEngine: PoissionEngine;
	private eventEngine: EventEngine;
	private bayesEngine: BayesEngine;

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;

		// creating the bayes engine and district stats based on the driver
		this.bayesEngine = new BayesEngine();
		this.stats = this.bayesEngine.driverBasedStats();

		// initializing markov engine
		this.markovEngine = new MarkovEngine(this.stats);
		this.state = this.markovEngine.nextState("Stable");
		this.eventLogs = [];
		this.arrest = null;

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
				clue: event.clue,
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

			// if arrest was good then, one responder can handle all the events in the district
			if (this.arrest === this.bayesEngine.driver) {
				unhandledEvents.forEach((item) => {
					item.handled = true;
				});
			} else {
				unhandledEvents.forEach((item, index) => {
					if (index < respondersAssigned) item.handled = true;
				});
			}

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

	public getBelief = () => {
		return this.bayesEngine.belief;
	};

	public getClues = () => {
		return this.bayesEngine.getClue(this.eventLogs);
	};

	public purchasedClues = () => {
		return this.bayesEngine.purchasedClues;
	};

	public updateWithClue = (clue: Clue) => {
		return this.bayesEngine.updateWithClue(clue);
	};
	public getDriver = () => {
		return this.bayesEngine.driver;
	};
}

export function getDistricts(): District[] {
	const districts: District[] = districtConfig.map(
		(name, index) => new District(index, name),
	);

	return districts;
}
