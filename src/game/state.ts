import Canvas from "@/ui/canvas";
import Clock from "./clock";
import { District } from "./districts";

import type { GAME_STATUS, Purchase } from "./type";

const INITAL_TOKENS = 100;
const INITAL_ENTROPY = 4.0;
const INITIAL_CREDIBILITY = 0;

export default class GameState {
	tokens: number;
	entropy: number;
	credibility: number;

	status: GAME_STATUS;
	purchase_history: Purchase[];

	clock: Clock;
	canvas: Canvas;
	districts: District[];

	constructor(canvas: Canvas, districts: District[]) {
		this.tokens = INITAL_TOKENS;
		this.entropy = INITAL_ENTROPY;
		this.credibility = INITIAL_CREDIBILITY;

		this.purchase_history = [];
		this.status = "MENU";

		this.clock = new Clock(this._onTick);
		this.canvas = canvas;
		this.districts = districts;
	}

	start() {
		this.status = "PLAYING";
		this.clock.play();
	}

	pause() {
		this.status = "PAUSED";
		this.clock.pause();
	}

	public purchase = (particular: string, tokens: number) => {
		this.purchase_history.push({
			particular,
			tokens,
		});

		this.tokens -= tokens;
	};

	public getPurchaseHistory = () => {
		return this.purchase_history;
	};

	_checkWinLoss = () => {
		if (this.tokens < 0) this._render_end_screen("loss");
		if (this.entropy < 2.0) this._render_end_screen("win");
	};

	_onTick = () => {
		if (this.status !== "PLAYING") return;

		// update all the districts
		this.districts.forEach((district) => district.update(this));

		// check win or loss
		this._checkWinLoss();

		// render the canvas
		this._render();
	};

	_render() {
		this.canvas._render(this);
	}

	_render_end_screen(state: string) {}
}
