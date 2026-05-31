import type { District } from "@/game/districts";
import { FireDepartment } from "@/game/fire-department";
import type { Purchase } from "@/game/type";

export type Canvas = "markov" | "intervention" | "poisson";

export interface DashboardProps {
	districts: District[];
	day: number;
	onPurchase: (item: Purchase) => void;
	fireDepartment: FireDepartment;
}

export interface DashboardState {
	openCanvas: Canvas;
	activeDistrict: number;
	fogRevealed: string[];
}
