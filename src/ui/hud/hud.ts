import MiniItem from "./mini-item";

import "./style.css";

export interface HUDProps {
	day: number;
	maxDay: number;
	budget: number;
	credibility: number;
	cityEntropy: number;
}

export default function HUD(props: HUDProps): HTMLElement {
	const nav = document.createElement("nav");

	// logo
	const logoDiv = document.createElement("div");
	const logoMain = document.createElement("p");
	logoMain.textContent = "Probablia";
	const logoSubtitle = document.createElement("p");
	logoSubtitle.textContent = "The Outbreak";

	logoDiv.appendChild(logoMain);
	logoDiv.appendChild(logoSubtitle);

	// game items
	const itemsDiv = document.createElement("div");
	itemsDiv.appendChild(
		MiniItem({ title: "day", content: `${props.day}/${props.maxDay}` }),
	);
	itemsDiv.appendChild(
		MiniItem({ title: "budget", content: `${props.budget} tokens` }),
	);
	itemsDiv.appendChild(
		MiniItem({
			title: "credibility",
			content: `${Math.ceil(props.credibility * 100)}%`,
		}),
	);
	itemsDiv.appendChild(
		MiniItem({
			title: "city entropy",
			content: `${props.cityEntropy.toFixed(2)} bits`,
		}),
	);

	// appending the componets to nav
	nav.appendChild(logoDiv);
	nav.appendChild(itemsDiv);

	return nav;
}
