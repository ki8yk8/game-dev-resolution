import "./style.css";
import { MarkovEngine } from "../markov";

import type { Purchase } from "@/game/type";
import type { District } from "@/game/districts";

const STABILIZE_COST = 5;

interface InterventionCanvasProps {
	district: District;
	canStabilize: boolean;
	onInterventionPurchase: (item: Purchase) => void;
}

export default function InterventionCanvas(
	props: InterventionCanvasProps,
): HTMLElement {
	const canvas = document.createElement("div");
	canvas.className = "dashboard__canvas";

	const title = document.createElement("p");
	title.className = "dashboard__canvas__title";
	canvas.appendChild(title);

	const description = document.createElement("p");
	description.className = "dashboard__canvas__description";
	canvas.appendChild(description);

	const districtName = document.createElement("p");
	districtName.className = "intervention__district";
	canvas.appendChild(districtName);

	const stabilizeTitle = document.createElement("p");
	stabilizeTitle.className = "intervention__stabilize__title";
	canvas.appendChild(stabilizeTitle);

	const stabilizeDescription = document.createElement("p");
	stabilizeDescription.className = "intervention__stabilize__description";
	canvas.appendChild(stabilizeDescription);

	const stabilizeWrapper = document.createElement("div");
	stabilizeWrapper.className = "intervention__stabilize__wrapper";
	canvas.appendChild(stabilizeWrapper);

	const stabilizeButton = document.createElement("button");
	stabilizeWrapper.appendChild(stabilizeButton);

	const stabilizeImpact = document.createElement("p");
	stabilizeWrapper.appendChild(stabilizeImpact);

	// content
	title.textContent = "Intervention Panel";
	description.textContent =
		"You can perform various actions to stabilize the chaos of individual districts.";
	stabilizeTitle.textContent = "Stabilize the District";
	stabilizeDescription.textContent =
		"After day 3, you can use your tokens to stabilize the city that would decreases the negative statistics of a district.";
	stabilizeButton.textContent = `Stabilize (-${STABILIZE_COST} Token)`;
	if (props.canStabilize) {
		const propsedStats = Object.fromEntries(
			(
				Object.entries(props.district.stats) as [
					keyof typeof props.district.stats,
					number,
				][]
			).map(([key, value]) =>
				key === "infraHealth"
					? [key, value + 0.15]
					: [key, Math.max(0, value - 0.15)],
			),
		) as Record<keyof typeof props.district.stats, number>;

		const tempMarkovEngine = new MarkovEngine(propsedStats);
		const { Riot: futureRiot } = tempMarkovEngine.steadyState();
		const { Riot: curretnRiot } = props.district.longForecast();
		const projectedImpact = (futureRiot - curretnRiot) * 100;

		stabilizeImpact.textContent = `Riot risk will be ${projectedImpact > 0 ? "+" : ""}${projectedImpact.toFixed(2)}%`;
		stabilizeButton.onclick = () =>
			props.onInterventionPurchase({
				particular: "Stabilization",
				tokens: STABILIZE_COST,
			});
	} else {
		stabilizeButton.disabled = true;
	}

	const steadyState = props.district.longForecast();
	const maxState = (
		Object.keys(steadyState) as Array<keyof typeof steadyState>
	).find(
		(item) => Math.max(...Object.values(steadyState)) === steadyState[item],
	);

	districtName.textContent = `${props.district.name} - Current State: ${props.district.state}, Can stabilize at: ${maxState}`;

	return canvas;
}
