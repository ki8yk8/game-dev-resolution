import { District } from "@/game/districts";

export type Canvas = "markov" | "intervention" | "poisson";

export interface DashboardProps {
	districts: District[];
}

export interface DashboardState {
	openCanvas: Canvas;
	activeDistrict: number;
}
