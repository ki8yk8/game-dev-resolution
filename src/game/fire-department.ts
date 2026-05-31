const MAX_RESPONDERS = 4;

class FireDepartment {
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

	assignResponder = (districtId: number) => {
		if (this.freeResponders <= 0) {
			throw new Error(
				`No responders are available, ${this.assignment.length}>${this.maxResponders}`,
			);
		}

		this.assignment.push(districtId);
	};

	freeResponder = (districtId: number) => {
		if (!this.assignment.includes(districtId)) {
			throw new Error(
				`No responders are assigned to district id, ${districtId} not in ${this.assignment}`,
			);
		}

		this.assignment = this.assignment.filter((id) => id !== districtId);
	};
}
