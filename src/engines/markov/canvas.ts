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
	title.textContent = "Markov Panel";

	// district status
	const districtStatus = document.createElement("p");
	districtStatus.className = "markov__status";
	districtStatus.textContent = `${props.district.name} - Current State: ${props.district.state}`;

	// long run forecast
	const longForecastDiv = document.createElement("div");
	longForecastDiv.className = "markov__steady";

	const longForecastTitle = document.createElement("p");
	longForecastTitle.textContent = "Long-run Forecast";
	longForecastTitle.className = "markov__steady__title";
	longForecastDiv.appendChild(longForecastTitle);

	const longForecastBody = document.createElement("p");
	longForecastBody.className = "markov__steady__content";
	const forecast = props.district.longForecast();
	longForecastBody.textContent = `Stable: ${Math.floor(forecast.Stable * 100)}%, Tense: ${Math.floor(forecast.Tense * 100)}%, Riot: ${Math.floor(forecast.Riot * 100)}%, Recover: ${Math.floor(forecast.Recovery * 100)}%`;
	longForecastDiv.appendChild(longForecastBody);

	canvas.appendChild(title);
	canvas.appendChild(districtStatus);
	canvas.appendChild(longForecastDiv);

	return canvas;
}
