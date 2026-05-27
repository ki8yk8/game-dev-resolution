import type GameState from "@/game/state";
import Dashboard from "@/ui/canvas/dashboard";
import HUD from "./hud";

import "./style.css";

/**
 * Renders the web ui of the game
 */
export default class Canvas {
	private root: HTMLElement;

	constructor() {
		// assign canvas to the html app
		const root = document.getElementById("app");
		if (!root) {
			throw new Error(
				"Couldn't find the root element, document.getElementById('app') is null ",
			);
		}
		this.root = root;
	}

	_render = (gameState: GameState) => {
		// clear all the elements inside root
		this.root.innerHTML = "";

		// render the component
		const main = document.createElement("main");
		main.className = "app";
		const dashboard = Dashboard({ districts: gameState.districts });

		main.appendChild(
			HUD({
				status: gameState.status,
				day: gameState.clock.tick,
				maxDay: gameState.clock.maxTick,
				budget: gameState.tokens,
				credibility: gameState.credibility,
				cityEntropy: gameState.entropy,
				speedFactor: gameState.clock.speedFactor,
				onPlay: gameState.start,
				onPause: gameState.pause,
				onChangeSpeed: gameState.clock.changeSpeed,
			}),
		);
		main.appendChild(dashboard);

		this.root.appendChild(main);
	};
}
