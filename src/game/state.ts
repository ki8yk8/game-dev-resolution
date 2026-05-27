import type { Purchase } from "./type";

const INITIAL_TOKEN = 100;

export class GameState {
	tokens: number;
	private purchase_history: Purchase[];

	constructor() {
		this.tokens = INITIAL_TOKEN;
		this.purchase_history = [];
	}

	public purchase = (particular: string, tokens: number) => {
		if (this.tokens < tokens) {
			throw new Error("Couldn't complete the purchase. Infsufficient tokens.");
		}

		this.purchase_history.push({
			particular,
			tokens,
		});

		this.tokens -= tokens;
	};

	public getPurchaseHistory = () => {
		return this.purchase_history;
	};
}
