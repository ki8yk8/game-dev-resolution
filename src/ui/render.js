import Message from "./message";
import { STORY } from "./scripts";

const ALPHABETS = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
];

function prepareChoiceMessage(choices) {
	const choicesWithPrefix = choices.map(
		(choice, i) => `(${ALPHABETS[i]}). ${choice}`,
	);
	return choicesWithPrefix.join("        ");
}

export default function renderScene({ k, c, deps }) {
	const storyItems = Object.entries(STORY);

	storyItems.forEach(([item, meta]) => {
		// TODO: add layer here so that it stays in bottom with respect to the player
		const itemBoundary = k.add([
			k.rect(50, 10), // dummy for now will be changed dynamically later
			k.color(0, 0, 0),
			k.anchor("center"),
			k.pos(k.vec2(meta.pos)),
			k.area(),
			["storyItem", item],
		]);

		const label = itemBoundary.add([
			k.text(meta.label, {
				size: 16,
			}),
			k.anchor("center"),
			k.color(255, 255, 255),
		]);

		// changing the bbox based on height and width of the label
		itemBoundary.width = label.width + 40;
		itemBoundary.height = label.height + 20;

		itemBoundary.onCollide("player", async (player) => {
			// on collision first disable player movement
			deps.disablePlayerMovement();

			// display the text associated with the story item
			await Message({ k, c, text: meta.text });

			// present the choices
			const choiceMessage = prepareChoiceMessage(
				meta.choices.map((item) => item.text),
			);
			// TODO: choice options
			const choice = await Message({
				k,
				c,
				text: choiceMessage,
				closeKey: null,
			});

			// enable player movement
			deps.enablePlayerMovement();
		});
	});
}
