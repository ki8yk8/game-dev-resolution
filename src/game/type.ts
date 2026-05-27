import type Clock from "./clock";

export type GAME_STATUS = "MENU" | "PLAYING" | "PAUSED" | "GAMEOVER";

export type SubscriberCallback = (clock: Clock) => void;

export interface Purchase {
	tokens: number;
	particular: string;
}

export type DistrictState = "Stable" | "Tense" | "Riot" | "Recovery";

export interface DistrictStats {
	infectionRate: number;
	crimeIndex: number;
	infraHealth: number;
	socialTension: number;
}