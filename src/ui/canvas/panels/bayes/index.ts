import type { District } from "@/game/districts";

import "./style.css";

interface BayesPanelProps {
	district: District;
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
	beliefs.appendChild(beliefTitle);

	const beliefDescription = document.createElement("p");
	beliefs.appendChild(beliefDescription);

	const beliefTable = document.createElement("table");
	beliefs.appendChild(beliefTable);

	const cluesTitle = document.createElement("p");
	clues.appendChild(cluesTitle);

	const cluesDescription = document.createElement("p");
	clues.appendChild(cluesDescription);

	const cluesActionWrapper = document.createElement("div");
	clues.appendChild(cluesActionWrapper);

	const noClues = document.createElement("p");
	cluesActionWrapper.appendChild(noClues);

	// content
	title.textContent = "Bayes Panel";
	districtName.textContent = props.district.name;
	description.textContent =
		"Each of your district is in chaos because of a driver. Use this panel to identify the driver and reduce the chaos of the system.";
	beliefTitle.textContent = "Your Belief";
	beliefDescription.textContent =
		"This shows what your belief in different drivers.";

	// add the belief table
	Object.entries(props.district.getBelief()).map(([driver, belief]) => {
		const tr = document.createElement("tr");
		beliefTable.appendChild(tr);

		const driver_td = document.createElement("td");
		tr.appendChild(driver_td);

		const belief_td = document.createElement("td");
		tr.appendChild(belief_td);

		// text content
		driver_td.textContent = driver;
		belief_td.textContent = `${(belief * 100).toFixed(2)}%`;
	});

	cluesTitle.textContent = "Clues";
	cluesDescription.textContent =
		"You can buy the clues for higher confidence in your beliefs. Note that, the clues are generated based on events in each district.";

	noClues.textContent = "No event generated to give a clue.";

	return canvas;
}
