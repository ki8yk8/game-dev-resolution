import { Message } from "./message";

export function handleChoices({
	k,
	c,
	storyItem,
	choice,
	addToCollection,
	collections,
}) {
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
				const conditionMet = collections.includes(choice.condition);

				if (conditionMet) {
					const result = await handleChoices({
						k,
						c,
						storyItem,
						choice: choice.ifTrue,
						addToCollection,
						collections,
					});
					resolve(result);
				} else {
					const result = await handleChoices({
						k,
						c,
						storyItem,
						choice: choice.ifFalse,
						addToCollection,
						collections,
					});
					resolve(result);
				}
				break;

			case "door_opens":
				resolve("door_opens");
				break;

			case "emergency_door_opens":
				resolve("emergency_door_opens");
				break;
		}
	});
}
