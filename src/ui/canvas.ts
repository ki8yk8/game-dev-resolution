import { type GameState } from "../components/clock";
import { District } from "../components/districts";
import Dashboard from "./dashboard";
import HUD, { type HUDProps } from "./hud/hud";

import "./style.css";

interface CanvasProps {
	root: HTMLElement;
	hudProps: HUDProps;
	district: District[];
}

/**
 * Renders the web ui of the game
 */
export default class Canvas {
	private root: HTMLElement;
	private hudProps: HUDProps;
	private districts: District[];

	constructor(props: CanvasProps) {
		this.root = props.root;
		this.hudProps = props.hudProps;
		this.districts = props.district;

		this.render();
	}

	private render = () => {
		// clear all the elements inside root
		this.root.innerHTML = "";

		// render the component
		const main = document.createElement("main");
		main.className = "app"
		const dashboard = Dashboard({ districts: this.districts });

		main.appendChild(HUD(this.hudProps));
		main.appendChild(dashboard);

		this.root.appendChild(main);
	};

	public handleClockChange = (gameState: GameState) => {
		this.hudProps.day = gameState.tick;
		this.hudProps.state = gameState.state;
		((this.hudProps.speedFactor = gameState.speedFactor), this.render());
	};
}
