import { Message } from "./message";

export function handleChoices({ k, c, storyItem, choice, addToCollection }) {
	return new Promise(async (resolve) => {
		// display the message
		choice.message && (await Message({ k, c, text: choice.message }));

		switch (choice.outcome) {
			case "death":
				resolve("death");
				break;

			case "collect":
				// store the item in the collection
				addToCollection(storyItem);
				resolve("alive");
				break;

			case "skip":
				// do nothing
				resolve("alive");
				break;

			case "conditional":
				const conditionMet = collection.includes(choice.condition);

				if (conditionMet) {
					const result = await handleChoices({
						k,
						c,
						storyItem,
						choice: choice.ifTrue,
						collection,
					});
					resolve(result);
				} else {
					const result = await handleChoices({
						k,
						c,
						storyItem,
						choice: choice.ifFalse,
						collection,
					});
					resolve(result);
				}
				break;

			case "door_opens":
				resolve("win");
				break;
		}
	});
}
