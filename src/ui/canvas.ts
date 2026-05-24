import { type GameState } from "../components/clock";
import HUD, { type HUDProps } from "./hud/hud";

interface CanvasProps {
	root: HTMLElement;
	hudProps: HUDProps;
}

/**
 * Renders the web ui of the game
 */
export default class Canvas {
	private root: HTMLElement;
	private hudProps: HUDProps;

	constructor(props: CanvasProps) {
		this.root = props.root;
		this.hudProps = props.hudProps;

		this.render();
	}

	private render = () => {
		// clear all the elements inside root
		this.root.innerHTML = "";

		// render the component
		const main = document.createElement("main");

		main.appendChild(HUD(this.hudProps));

		this.root.appendChild(main);
	};

	public onChange = (gameState: GameState) => {
		this.hudProps.day = gameState.tick;
		this.hudProps.state = gameState.state;
		this.hudProps.speedFactor = gameState.speedFactor,
		this.render();
	};
}
