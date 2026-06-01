export type Driver = "infection" | "crime" | "infra. failure";

export type Clue =
	| "disease outbreak"
	| "criminal activity"
	| "infrastrucure failure";

export type Belief = Record<Driver, number>;
