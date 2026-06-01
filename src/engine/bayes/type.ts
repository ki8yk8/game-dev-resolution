export type Driver = "infection" | "crime" | "infra";

export type Clue =
	| "disease_outbreak"
	| "criminal_activity"
	| "infrastrucure_failure";

export type Belief = Record<Driver, number>;
