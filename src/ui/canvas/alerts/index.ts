import { OccuredEvent } from "@/game/type";

interface AlertsProps {
	alerts: OccuredEvent[];
}

export default function Alerts(props: AlertsProps) {
	const alertsBar = document.createElement("section");
	alertsBar.className = "alerts";

	console.log(props.alerts);

	return alertsBar;
}
