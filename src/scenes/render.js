import { Message, handleChoices } from "../ui";
import { STORY } from "../data/scripts";
import { ALPHABETS, prepareChoiceMessage } from "../utils";

export function renderScene({ k, c, deps }) {
	return new Promise((resolve) => {
		const storyItems = Object.entries(STORY);

		storyItems.forEach(([item, meta]) => {
			// TODO: add layer here so that it stays in bottom with respect to the player
			const itemBoundary = k.add([
				k.rect(50, 10), // dummy for now will be changed dynamically later
				k.color(0, 0, 0),
				k.anchor("center"),
				k.pos(k.vec2(meta.pos)),
				k.scale(1.0),
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
				const choices = meta.choices.map((item) => item.text);
				const choiceMessage = prepareChoiceMessage(choices);
				const choiceOption = await Message({
					k,
					c,
					text: choiceMessage,
					closeKey: ALPHABETS.slice(0, choices.length),
					closeHint: "Choose an option to continue",
				});
				const choiceIndex = ALPHABETS.findIndex(
					(item) => item.toLowerCase() === choiceOption.toLowerCase(),
				);
				const choice = meta.choices[choiceIndex];

				// handle the choice appropriately
				const result = await handleChoices({
					k,
					c,
					choice,
					storyItem: item,
					collection: deps.collection,
				});

				// choice has been made so disappear this item
				await k.tween(k.vec2(1), k.vec2(0), 0.5, (s) => {
					itemBoundary.scale = s;
				});
				k.destroy(itemBoundary);

				// enable player movement
				deps.enablePlayerMovement();

				// if result is win or death then resolve else continue playing
				if (["win", "death"].includes(result)) resolve(result === "win");
			});
		});
	});
}
