import type { District } from "@/game/districts";
import type { Purchase } from "@/game/type";

export type Canvas = "markov" | "intervention" | "poisson";

export interface DashboardProps {
	districts: District[];
	onPurchase: (item: Purchase) => void;
}

export interface DashboardState {
	openCanvas: Canvas;
	activeDistrict: number;
	fogRevealed: string[];
}
