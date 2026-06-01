// import "./style.css";

export default function BayesPanel(): HTMLElement {
	const canvas = document.createElement("div");
	canvas.className = "dashboard__canvas";

	const title = document.createElement("p");
	title.className = "dashboard__canvas__title";
	canvas.appendChild(title);

	const description = document.createElement("p");
	description.className = "dashboard__canvas__description";
	canvas.appendChild(description);

	// content
	title.textContent = "Bayes Panel";
	description.textContent =
		"Each of your district is in chaos because of a driver. Use this panel to identify the driver and reduce the chaos of the system.";

	return canvas;
}
