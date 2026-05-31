import "./style.css";
import { MarkovEngine } from "../markov";

import type { Purchase } from "@/game/type";
import type { District } from "@/game/districts";
import type { FireDepartment } from "@/game/fire-department";

const STABILIZE_COST = 5;

interface InterventionCanvasProps {
	district: District;
	canStabilize: boolean;
	onInterventionPurchase: (item: Purchase) => void;
	fireDepartment: FireDepartment;
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

	const respondersTitle = document.createElement("p");
	respondersTitle.className = "intervention__responders__title";
	canvas.appendChild(respondersTitle);

	const respondersDescription = document.createElement("p");
	respondersDescription.className = "intervention__responders__description";
	canvas.appendChild(respondersDescription);

	const responderButtons = document.createElement("div");
	responderButtons.className = "intervention__responders__buttons";
	canvas.appendChild(responderButtons);

	const responderButtonUp = document.createElement("button");
	responderButtons.appendChild(responderButtonUp);

	const responderButtomDown = document.createElement("button");
	responderButtons.appendChild(responderButtomDown);

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

	respondersTitle.textContent = `Responders (${props.fireDepartment.freeResponders}/${props.fireDepartment.maxResponders} available, ${props.fireDepartment.districtHasResponders(props.district.id)} assign to ${props.district.name})`;

	respondersDescription.textContent =
		"Responders at every day work to handle one issue. There are 4 responders available so, allocate them wisely.";
	responderButtonUp.textContent = "Assign 1 responder";
	responderButtomDown.textContent = "Relinquish 1 responder";

	if (props.fireDepartment.freeResponders === 0) {
		responderButtonUp.disabled = true;
	}
	if (props.fireDepartment.districtHasResponders(props.district.id) === 0) {
		responderButtomDown.disabled = true;
	}

	return canvas;
}
