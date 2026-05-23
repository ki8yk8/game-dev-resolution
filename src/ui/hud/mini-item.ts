interface MiniItemProps {
	title: string;
	content: string;
	color?: string;
}

export default function MiniItem(props: MiniItemProps): HTMLDivElement {
	const miniItemDiv = document.createElement("div");
	miniItemDiv.className = "mini_item";

	const itemTitle = document.createElement("p");
	itemTitle.className = "mini_item__title";
	itemTitle.textContent = props.title.trim().toUpperCase();

	const itemContent = document.createElement("small");
	itemContent.className = "mini_item__content";
	itemContent.textContent = props.content;
	itemContent.style.color = props.color ?? "var(--torquise)";

	miniItemDiv.appendChild(itemTitle);
	miniItemDiv.appendChild(itemContent);

	return miniItemDiv;
}