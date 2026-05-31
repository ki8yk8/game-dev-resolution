import type { OccuredEvent } from "@/game/type";

import "./style.css";
import Alert from "./alert";

interface AlertsProps {
	alerts: OccuredEvent[];
}

export default function Alerts(props: AlertsProps) {
	const alertsBar = document.createElement("section");
	alertsBar.className = "alerts";

	const alertsTitle = document.createElement("p");
	alertsTitle.className = "alerts__title";
	alertsBar.appendChild(alertsTitle);

	const alerts = document.createElement("div");
	alerts.className = "alerts__body";
	alertsBar.appendChild(alerts);

	const noAlerts = document.createElement("p");
	noAlerts.className = "alerts__body__none";
	if (props.alerts.length == 0) alerts.appendChild(noAlerts);

	// content for the game
	alertsTitle.textContent = "alerts";
	noAlerts.textContent = "There are no events so far!";

	const districts = props.alerts.map((item) => item.districtName);
	const uniqueDistricts = districts.filter(
		(item, index, arr) => arr.indexOf(item) == index,
	);

	// for all unique districts compute the handled and unhandled events and create the alert
	uniqueDistricts.forEach((distictName) => {
		const districtEvents = props.alerts.filter(
			(item) => item.districtName == distictName,
		);
		const handledEvents = districtEvents.filter((item) => item.handled);
		const undhandledEvents = districtEvents.filter((item) => !item.handled);

		alerts.appendChild(
			Alert({
				district: distictName,
				handledEvents,
				undhandledEvents,
			}),
		);
	});

	return alertsBar;
}
