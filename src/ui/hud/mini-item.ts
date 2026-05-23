interface MiniItemProps {
	title: string;
	content: string;
	color?: string;
}

export default function MiniItem(props: MiniItemProps): HTMLDivElement {
	const miniItemDiv = document.createElement("div");

	const itemTitle = document.createElement("p");
	itemTitle.textContent = props.title.trim().toUpperCase();

	const itemContent = document.createElement("small");
	itemContent.textContent = props.content;
	itemContent.style.color = props.color ?? "#000000";

	miniItemDiv.appendChild(itemTitle);
	miniItemDiv.appendChild(itemContent);

	return miniItemDiv;
}