import type { District } from "@/game/districts";
import type { Purchase } from "@/game/type";

export type Canvas = "markov" | "intervention" | "poisson";

export interface DashboardProps {
	districts: District[];
	day: number;
	onPurchase: (item: Purchase) => void;
	responders: RespondersInfo;
}

export interface RespondersInfo {
	free: number;
	max: number;
	hasResponders: (id: number) => number;
	relinquish: (id: number) => void;
}

export interface DashboardState {
	openCanvas: Canvas;
	activeDistrict: number;
	fogRevealed: string[];
}
