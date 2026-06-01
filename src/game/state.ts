import Canvas from "@/ui/canvas";
import Clock from "./clock";
import { District } from "./districts";
import { FireDepartment } from "./fire-department";

import type {
	GAME_STATUS,
	OccuredEvent,
	PurcahseWithTick,
	Purchase,
} from "./type";
import { Entropy } from "./entropy";

const INITAL_TOKENS = 100;
const INITAL_ENTROPY = 4.0;
const INITIAL_CREDIBILITY = 0;
const UNHANDLED_EVENT_PENALTY = 1;

export default class GameState {
	tokens: number;
	credibility: number;
	entropy: Entropy;

	status: GAME_STATUS;
	purchase_history: PurcahseWithTick[];
	fireDepartment: FireDepartment;

	clock: Clock;
	canvas: Canvas;
	districts: District[];

	constructor(canvas: Canvas, districts: District[]) {
		this.tokens = INITAL_TOKENS;
		this.entropy = new Entropy(INITAL_ENTROPY);
		this.credibility = INITIAL_CREDIBILITY;

		this.purchase_history = [];
		this.status = "MENU";

		this.clock = new Clock(this._onTick);
		this.canvas = canvas;
		this.districts = districts;
		this.fireDepartment = new FireDepartment();
	}

	public start = () => {
		this.status = "PLAYING";
		this.clock.play();

		this._render();
	};

	public pause = () => {
		this.status = "PAUSED";
		this.clock.pause();

		this._render();
	};

	public purchase = (item: Purchase) => {
		this.purchase_history.push({
			...item,
			day: this.clock.tick,
		});

		this.tokens -= item.tokens;
		this.tokens = Math.max(this.tokens, 0);

		this._render();
	};

	public changeCredibility = (delta: number) => {
		this.credibility += delta;
		this._render();
	};

	public getPurchaseHistory = () => {
		return this.purchase_history;
	};

	protected _checkWinLoss = () => {
		if (this.tokens <= 0) this._render_end_screen("loss");
		if (this.entropy.value < 2.0) this._render_end_screen("win");
	};

	public _onTick = () => {
		if (this.status !== "PLAYING") return;

		// update all the districts
		this.districts.forEach((district) => district.update(this));

		// check for unhandle events and change the budget accordingly
		const unhandledEvents = this.checkUnhandledEvents();
		if (unhandledEvents.length > 0) {
			this.tokens -= unhandledEvents.length * UNHANDLED_EVENT_PENALTY;
			this.tokens = Math.max(this.tokens, 0);
		}

		// update the entropy of the system
		this.entropy.updateEntropy(this.districts);

		// check win or loss
		this._checkWinLoss();

		// render the canvas
		this._render();
	};

	protected checkUnhandledEvents = (): OccuredEvent[] => {
		/**
		 * when a event goes unhandled then, it decreases the budget
		 */
		return this.districts
			.flatMap((item) => item.eventLogs)
			.filter((item) => !item.handled);
	};

	protected _render() {
		this.canvas._render(this);
	}

	protected _render_end_screen(state: string) {
		this.pause();

		if (state == "loss") {
			console.log("You lost");
		} else {
			console.log("You won");
		}
	}
}
