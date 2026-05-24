export default function InterventionCanvas(): HTMLElement {
	const canvas = document.createElement("div");
	canvas.className = "dashboard__canvas";

	const title = document.createElement("p");
	title.className = "dashboard__canvas__p";
	title.textContent = "Intervention Panel";

	canvas.appendChild(title);

	return canvas;
}
