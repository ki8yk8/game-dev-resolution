import { District } from "./districts";

export class Entropy {
	public entropy: number;

	constructor(entropy: number) {
		this.entropy = entropy;
	}

	get value() {
		return this.entropy;
	}

	updateEntropy(districts: District[]) {
		const probablityCurrentToStable = districts.map((district) => {
			const currentState = district.state;
			return district.transitionMatrix()[currentState]["Stable"];
		});

		// compute shanon entropy
		this.entropy = -probablityCurrentToStable.reduce(
			(prev_p, p) => prev_p + p * Math.log2(p),
			0,
		);
	}
}
