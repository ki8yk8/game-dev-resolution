import type { District } from "@/game/districts";

import "./style.css";
import { Driver } from "@/engine/bayes/type";

const CLUE_COST = 10;

interface BayesPanelProps {
	district: District;
	onArrest: (driver: Driver) => void;
	onPurcahseClue: (clue: string, token: number) => void;
	arrest?: Driver;
}

export default function BayesPanel(props: BayesPanelProps): HTMLElement {
	const canvas = document.createElement("div");
	canvas.className = "dashboard__canvas";

	const title = document.createElement("p");
	title.className = "dashboard__canvas__title";
	canvas.appendChild(title);

	const description = document.createElement("p");
	description.className = "dashboard__canvas__description";
	canvas.appendChild(description);

	const districtName = document.createElement("p");
	districtName.className = "belief__district";
	canvas.appendChild(districtName);

	const beliefCluesWrapper = document.createElement("main");
	beliefCluesWrapper.className = "belief__main__wrapper";
	canvas.appendChild(beliefCluesWrapper);

	const beliefs = document.createElement("div");
	beliefs.className = "beliefs";
	beliefCluesWrapper.appendChild(beliefs);

	const clues = document.createElement("div");
	clues.className = "clues";
	beliefCluesWrapper.appendChild(clues);

	const beliefTitle = document.createElement("p");
	beliefTitle.className = "bayes__belief__title";
	beliefs.appendChild(beliefTitle);

	const beliefDescription = document.createElement("p");
	beliefDescription.className = "bayes__belief__description";
	beliefs.appendChild(beliefDescription);

	const beliefTable = document.createElement("table");
	beliefs.appendChild(beliefTable);

	const cluesTitle = document.createElement("p");
	cluesTitle.className = "bayes__clues__title";
	clues.appendChild(cluesTitle);

	const cluesDescription = document.createElement("p");
	cluesDescription.className = "bayes__clues__description";
	clues.appendChild(cluesDescription);

	const cluesActionWrapper = document.createElement("div");
	clues.appendChild(cluesActionWrapper);

	const noClues = document.createElement("p");
	cluesActionWrapper.appendChild(noClues);

	const arrestTitle = document.createElement("p");
	arrestTitle.className = "bayes__arrest__title";
	canvas.appendChild(arrestTitle);

	const arrestDescription = document.createElement("p");
	arrestDescription.className = "bayes__arrest__description";
	canvas.appendChild(arrestDescription);

	const arrestOptions = document.createElement("div");
	arrestOptions.className = "bayes__arrest__options";
	canvas.appendChild(arrestOptions);

	const belief = props.district.getBelief();
	const drivers = Object.keys(belief) as Array<keyof typeof belief>;

	drivers.forEach((item) => {
		const button = document.createElement("button");
		arrestOptions.appendChild(button);

		button.textContent = item;

		if (props.arrest) {
			button.disabled = item !== props.arrest;
		} else {
			button.onclick = () => props.onArrest(item);
		}
	});

	// content
	title.textContent = "Bayes Panel";
	districtName.textContent = `For district: ${props.district.name}`;
	description.textContent =
		"Each of your district is in chaos because of a driver. Use this panel to identify the driver and reduce the chaos of the system.";
	beliefTitle.textContent = "Your Belief";
	beliefDescription.textContent =
		"This shows what your belief in different drivers.";

	// add the belief table
	Object.entries(props.district.getBelief()).map(([driver, belief]) => {
		const tr = document.createElement("tr");
		beliefTable.appendChild(tr);

		const driver_th = document.createElement("th");
		tr.appendChild(driver_th);

		const belief_td = document.createElement("td");
		tr.appendChild(belief_td);

		// text content
		driver_th.textContent = driver;
		belief_td.textContent = `${(belief * 100).toFixed(2)}%`;
	});

	cluesTitle.textContent = "Clues";
	cluesDescription.textContent =
		"You can buy the clues for higher confidence in your beliefs. Note that, the clues are generated based on events in each district.";

	noClues.textContent = "No event generated to give a clue.";
	const districtClues = props.district.getClues();
	if (districtClues.length > 0) {
		// clear the no clue coz here is a clue
		cluesActionWrapper.innerHTML = "";

		// add the action button for each clue
		districtClues.forEach((item) => {
			const button = document.createElement("button");
			cluesActionWrapper.appendChild(button);

			// disable if the clue is already purcahsed
			button.disabled = props.district.purchasedClues().includes(item);
			button.textContent = `${item} (-${CLUE_COST} token)`;
			button.onclick = () => props.onPurcahseClue(item, CLUE_COST);
		});
	}

	arrestTitle.textContent = "Arrest the Driver";
	arrestDescription.textContent =
		"If you are confident about the chaotic driver of the district, you can arrest it, or you can buy the clue to be more confident. Successfull arrest will increase your credibility and responders efficiency for the district, while unsuccessfull arrest will decrease your credibility.";

	return canvas;
}
