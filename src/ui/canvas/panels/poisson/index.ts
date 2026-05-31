import { District } from "@/game/districts";
import "./style.css";
import { Event } from "@/game/type";

interface PoissonCanvasProps {
	districts: District[];
	eventLog: Event[];
	activeIndex: number;
}

export default function PoissonCanvas(props: PoissonCanvasProps): HTMLElement {
	const canvas = document.createElement("div");
	canvas.className = "dashboard__canvas";

	const title = document.createElement("p");
	title.className = "dashboard__canvas__title";
	canvas.appendChild(title);

	const description = document.createElement("p");
	description.className = "dashboard__canvas__description";
	canvas.appendChild(description);

	const table_title = document.createElement("p");
	table_title.className = "poisson_canvas__table_title";
	canvas.appendChild(table_title);

	const table = document.createElement("table");
	table.className = "poisson_canvas__table";
	canvas.appendChild(table);

	title.textContent = "Poission Panel";
	description.textContent =
		"Each districts fires crisis events at different rates. You can assign responder to each district and respond to the crisis.";
	table_title.textContent = "Districts with Event Rate";

	props.districts.forEach((district) => {
		const tr = document.createElement("tr");
		const th = document.createElement("th");
		const td = document.createElement("td");
		tr.appendChild(th);
		tr.appendChild(td);

		th.textContent = district.name;
		td.textContent = district.eventRate.toFixed(2);

		table.appendChild(tr);
	});

	return canvas;
}
