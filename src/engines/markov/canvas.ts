import "./style.css";
import { District } from "../../components/districts";

interface MarkovCanvasProps {
	district: District;
}

export default function MarkovCanvas(props: MarkovCanvasProps): HTMLElement {
	const canvas = document.createElement("div");
	canvas.className = "dashboard__canvas";

	// title for the panel
	const title = document.createElement("p");
	title.className = "dashboard__canvas__title";
	canvas.appendChild(title);

	// district status
	const districtStatus = document.createElement("p");
	districtStatus.className = "markov__status";
	canvas.appendChild(districtStatus);

	// long run forecast
	const longForecastDiv = document.createElement("div");
	longForecastDiv.className = "markov__steady";
	canvas.appendChild(longForecastDiv);

	const longForecastTitle = document.createElement("p");
	longForecastTitle.className = "markov__steady__title";
	longForecastDiv.appendChild(longForecastTitle);

	const longForecastBody = document.createElement("p");
	longForecastBody.className = "markov__steady__content";
	longForecastDiv.appendChild(longForecastBody);

	// content starts here
	title.textContent = "Markov Panel";
	districtStatus.textContent = `${props.district.name} - Current State: ${props.district.state}`;
	longForecastTitle.textContent = "Long-run Forecast";

	const forecast = props.district.longForecast();
	longForecastBody.textContent = `Stable: ${Math.floor(forecast.Stable * 100)}%, Tense: ${Math.floor(forecast.Tense * 100)}%, Riot: ${Math.floor(forecast.Riot * 100)}%, Recover: ${Math.floor(forecast.Recovery * 100)}%`;

	return canvas;
}
