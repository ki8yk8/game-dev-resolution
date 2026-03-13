import Message from "./message";

export function handleChoices({ k, c, storyItem, choice, collection }) {
	return new Promise(async (resolve) => {
		// display the message
		await Message({ k, c, text: choice.message });

		switch (choice.outcome) {
			case "death":
				resolve("death");
				break;

			case "collect":
				// store the item in the collection
				collection.append(storyItem);
				break;

			case "skip":
				// do nothing
				break;

			case "conditional":
				// TODO: evaluate if the item is in the collection and do action accordingly: choice.condition in collection => ifTrue else ifFalse
				break;

			case "door_opens":
				resolve("win");
				break;
		}

		// resolves the promise
		resolve("alive");
	});
}
