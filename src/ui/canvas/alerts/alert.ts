import { OccuredEvent } from "@/game/type";

interface AlertProps {
	district: string;
	handledEvents: OccuredEvent[];
	unhandledEvents: OccuredEvent[];
}

export default function Alert(props: AlertProps): HTMLElement {
	const alert = document.createElement("p");
	alert.className = "alert";

	const alertDistrict = document.createElement("span");
	alertDistrict.className = "alert__district";
	alert.appendChild(alertDistrict);

	const handledEvents = document.createElement("span");
	handledEvents.className = "alert__handled";
	if (props.handledEvents.length > 0) alert.appendChild(handledEvents);

	const undhandledEvents = document.createElement("span");
	undhandledEvents.className = "alert__unhandled";
	if (props.unhandledEvents.length > 0) alert.appendChild(undhandledEvents);

	// content
	alertDistrict.textContent = `${props.district}: `;
	handledEvents.textContent = `${props.handledEvents.length} handled events`
	undhandledEvents.textContent = `${props.unhandledEvents.length} unhandled events`

	return alert;
}
