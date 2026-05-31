import type { District } from "@/game/districts";
import "./style.css";

interface InterventionCanvasProps {
	district: District;
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

	// content
	title.textContent = "Intervention Panel";
	description.textContent =
		"You can perform various actions to stabilize the chaos of individual districts.";

	const steadyState = props.district.longForecast();
	const maxState = (
		Object.keys(steadyState) as Array<keyof typeof steadyState>
	).find(
		(item) => Math.max(...Object.values(steadyState)) === steadyState[item],
	);

	districtName.textContent = `${props.district.name} - Current State: ${props.district.state}, Can stabilize at: ${maxState}`;

	return canvas;
}
