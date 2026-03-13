import { STORY } from "./scripts";

function renderStoryItem({ k, item, meta }) {}

export default function renderScene({ k, c }) {
	const storyItems = Object.entries(STORY);

	storyItems.forEach(([item, meta]) => {
		const itemBoundary = k.add([
			k.rect(50, 10), // dummy for now will be changed dynamically later
			k.color(0, 0, 0),
			k.anchor("center"),
			k.pos(k.vec2(meta.pos)),
		]);

		const label = itemBoundary.add([
			k.text(meta.label, {
				size: 16,
			}),
			k.anchor("center"),
			k.color(255, 255, 255),
		]);

		itemBoundary.width = label.width + 40;
		itemBoundary.height = label.height + 20;
	});
}
