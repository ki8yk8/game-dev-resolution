import { GAME_STATUS } from "@/game/type";
import ControlButton from "@/ui/components/control-btn";

interface HUDControlsProps {
	status: GAME_STATUS;
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
		onClick: props.status === "PAUSED" ? props.onPlay : props.onChangeSpeed,
	});

	const pauseButton = ControlButton({
		icon: "pause-fill",
		onClick: props.onPause,
		disabled: props.status !== "PLAYING",
	});

	// if game is paused then append paused control
	hudControlDiv.appendChild(speedButton);
	hudControlDiv.appendChild(pauseButton);

	return hudControlDiv;
}
