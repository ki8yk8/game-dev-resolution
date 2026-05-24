import { type GAME_STATES } from "../../components/clock";
import Icon from "../generic/icon";

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

interface ButtonProps {
	status?: string;
	icon: string;
	onClick: () => void;
	disabled?: boolean;
}

function ControlButton(props: ButtonProps) {
	const button = document.createElement("button");
	button.className = "button--control";
	button.onclick = props.onClick;
	button.appendChild(Icon(props.icon));
	button.disabled = props.disabled ?? false;

	if (props.status) {
		const buttonTitle = document.createElement("span");
		buttonTitle.textContent = props.status;

		button.appendChild(buttonTitle);
	}

	return button;
}
