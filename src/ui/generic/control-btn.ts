import Icon from "./icon";

interface ButtonProps {
	status?: string;
	icon: string;
	onClick: () => void;
	active?: boolean;
	disabled?: boolean;
}

export default function ControlButton(props: ButtonProps) {
	const button = document.createElement("button");
	button.className = `button--control ${props.active ? "button--control--active" : "button--control--inactive"}`;
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
