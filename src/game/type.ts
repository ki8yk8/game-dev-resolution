import type { Clue } from "@/engine/bayes/type";
import type Clock from "./clock";

export type GAME_STATUS = "MENU" | "PLAYING" | "PAUSED" | "GAMEOVER";

export type SubscriberCallback = (clock: Clock) => void;

export interface Purchase {
	tokens: number;
	particular: string;
}

export interface PurcahseWithTick extends Purchase {
	day: number;
}

export type DistrictState = "Stable" | "Tense" | "Riot" | "Recovery";

export interface DistrictStats {
	infectionRate: number;
	crimeIndex: number;
	infraHealth: number;
	socialTension: number;
}

export interface Event {
	clue: Clue;
	name: string;
	raises: keyof DistrictStats;
	raiseDelta: number;
	weight: (stats: DistrictStats) => number;
}

export interface OccuredEvent {
	id: string;
	name: string;
	clue: Clue;
	day: number;
	handled: boolean;
	districtId: number;
	districtName: string;
}
