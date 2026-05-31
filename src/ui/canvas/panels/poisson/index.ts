import "./style.css";
import type { OccuredEvent } from "@/game/type";
import type { District } from "@/game/districts";

interface PoissonCanvasProps {
	districts: District[];
	eventLog: OccuredEvent[];
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

	const eventLogTitle = document.createElement("p");
	eventLogTitle.className = "event_log__title";
	canvas.appendChild(eventLogTitle);

	const eventLogs = document.createElement("ul");
	eventLogs.className = "event_log__ul";
	canvas.appendChild(eventLogs);

	title.textContent = "Poission Panel";
	description.textContent =
		"Each districts fires crisis events at different rates. You can assign responder to each district and respond to the crisis.";
	table_title.textContent = "Districts with Event Rate";
	eventLogTitle.textContent = "All Event Logs";

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

	props.eventLog.forEach((event) => {
		const li = document.createElement("li");
		li.className = `event_log__ul__li ${event.handled ? "event_log__ul__li--handled" : "event_log__ul__li--unhandled"}`;
		eventLogs.appendChild(li);

		const logTopDiv = document.createElement("div");
		li.appendChild(logTopDiv);

		const eventName = document.createElement("p");
		logTopDiv.appendChild(eventName);

		const eventDay = document.createElement("p");
		logTopDiv.appendChild(eventDay);

		const logBottomDiv = document.createElement("div");
		li.appendChild(logBottomDiv);

		const districtName = document.createElement("p");
		logBottomDiv.appendChild(districtName);

		// content
		eventName.textContent = event.name;
		eventDay.textContent = `Day: ${event.day}`;
		districtName.textContent = `Occured at district: ${event.districtName}`;
	});

	return canvas;
}
