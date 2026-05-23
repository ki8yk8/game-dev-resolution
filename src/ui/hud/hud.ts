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
	nav.className = "hud";

	// logo
	const logoDiv = document.createElement("div");
	logoDiv.className = "hud__logo_div";

	const logoMain = document.createElement("p");
	logoMain.textContent = "Probablia";
	logoMain.className = "hud__logo_div__main";

	const logoSubtitle = document.createElement("p");
	logoSubtitle.textContent = "The Outbreak";
	logoSubtitle.classList = "hud__logo_div__subtitle";

	logoDiv.appendChild(logoMain);
	logoDiv.appendChild(logoSubtitle);

	// game items
	const itemsDiv = document.createElement("div");
	itemsDiv.className = "hud__mini_items"
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
			title: "entropy",
			content: `${props.cityEntropy.toFixed(2)} bits`,
		}),
	);

	// appending the componets to nav
	nav.appendChild(logoDiv);
	nav.appendChild(itemsDiv);

	return nav;
}
