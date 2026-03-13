import Message from "./message";

export function handleChoices({ k, c, storyItem, choice, collection }) {
	return new Promise(async (resolve) => {
		// display the message
		await Message({ k, c, text: choice.message });

		switch (choice.outcome) {
			case "death":
				// TODO: handles death of the user
				break;

			case "collect":
				// TODO: stores the item in the collection
				break;

			case "skip":
				// TODO: skips the item
				break;

			case "conditional":
				// TODO: evaluate if the item is in the collection and do action accordingly: choice.condition in collection => ifTrue else ifFalse
				break;

			case "door_opens":
				break;
		}

		// resolves the promise
		resolve();
	});
}
