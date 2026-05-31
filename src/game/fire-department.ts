const MAX_RESPONDERS = 4;

export class FireDepartment {
	public maxResponders: number;

	// assignment will have the district id to which the responder is assigned
	protected assignment: number[];

	constructor() {
		this.maxResponders = MAX_RESPONDERS;
		this.assignment = [];
	}

	get freeResponders() {
		return this.maxResponders - this.assignment.length;
	}

	districtHasResponders = (districtId: number) => {
		const districtResponders = this.assignment.filter(
			(id) => id === districtId,
		);

		return districtResponders.length;
	};

	assignResponder = (districtId: number) => {
		if (this.freeResponders <= 0) {
			throw new Error(
				`No responders are available, ${this.assignment.length}>${this.maxResponders}`,
			);
		}

		this.assignment.push(districtId);
	};

	relinquishResponder = (districtId: number) => {
		if (!this.assignment.includes(districtId)) {
			throw new Error(
				`No responders are assigned to district id, ${districtId} not in ${this.assignment}`,
			);
		}

		let removed = false;
		this.assignment = this.assignment.filter((id) => {
			if (removed) return true;
			removed = true;
			return id !== districtId;
		});
	};
}
