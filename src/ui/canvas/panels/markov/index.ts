import "./style.css";
import TransitionMatrixTableUI from "@/engine/markov/table";
import type { Purchase } from "@/game/type";
import type { District } from "@/game/districts";

interface MarkovCanvasProps {
	district: District;
	onPurchase: (item: Purchase) => void;
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

	// markov transition matrix table representation
	const markovSection = document.createElement("section");
	markovSection.className = "markov__table";
	canvas.appendChild(markovSection);

	const markovSectionTitleWrapper = document.createElement("div");
	markovSectionTitleWrapper.className = "markov__table__title__wrapper";
	markovSection.appendChild(markovSectionTitleWrapper);

	const markovSectionTtitle = document.createElement("p");
	markovSectionTtitle.className = "markov__table__title";
	markovSectionTitleWrapper.appendChild(markovSectionTtitle);

	const buyButton = document.createElement("button");
	buyButton.className = "markov__table__buy_button";
	markovSectionTitleWrapper.appendChild(buyButton);

	const markovTable = TransitionMatrixTableUI({
		matrix: props.district.transitionMatrix(),
	});
	markovSection.appendChild(markovTable);

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
	markovSectionTtitle.textContent = "Transition Probabilities";

	// prepare buy section
	buyButton.textContent = "Reveal Probabilities (-10 Token)";
	buyButton.onclick = props.onPurchase.bind(null, {
		particular: "Markov Reveal",
		tokens: 10,
	});

	const forecast = props.district.longForecast();
	longForecastBody.textContent = `Stable: ${Math.floor(forecast.Stable * 100)}%, Tense: ${Math.floor(forecast.Tense * 100)}%, Riot: ${Math.floor(forecast.Riot * 100)}%, Recover: ${Math.floor(forecast.Recovery * 100)}%`;

	return canvas;
}
