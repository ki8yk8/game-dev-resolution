import HUD, { type HUDProps } from "./hud/hud";

interface CanvasProps {
	root: HTMLElement;
	hudprops: HUDProps;
}

/**
 * Renders the web ui of the game
 */
export default function Canvas(props: CanvasProps) {
	const main = document.createElement("main");

	main.appendChild(HUD(props.hudprops));

	props.root.appendChild(main);
}
