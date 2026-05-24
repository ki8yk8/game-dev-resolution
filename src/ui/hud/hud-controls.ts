import { type GAME_STATES } from "../../components/clock";
import ControlButton from "../generic/control-btn";

interface HUDControlsProps {
	state: GAME_STATES;
	speedFactor: number;
	onPause: () => void;
	onPlay: () => void;
	onChangeSpeed: () => void;
}

export default function HUDControls(props: HUDControlsProps): HTMLElement {
	const hudControlDiv = document.createElement("div");
	hudControlDiv.className = "hud__control_div";

	// buttons
	const speedButton = ControlButton({
		status: `${props.speedFactor}x`,
		icon: "play-fill",
		onClick: props.state === "PAUSED" ? props.onPlay : props.onChangeSpeed,
	});

	const pauseButton = ControlButton({
		icon: "pause-fill",
		onClick: props.onPause,
		disabled: props.state !== "PLAYING",
	});

	// if game is paused then append paused control
	hudControlDiv.appendChild(speedButton);
	hudControlDiv.appendChild(pauseButton);

	return hudControlDiv;
}
