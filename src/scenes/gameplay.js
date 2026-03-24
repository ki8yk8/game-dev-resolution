import { Player } from "../objects";

async function GamePlay({ k, c }) {
	const { player, disablePlayerMovement, enablePlayerMovement } = Player({
		k,
		c: CONSTANTS,
	});

	// bag that stores the collected story items
	const collection = [];

	// disables player movement while the welcome message is being displayed
	disablePlayerMovement();

	// extracts the welcome message lines by lines discarding empty strings
	const welcomeLines = WELCOME_MESSAGE.split("\n")
		.filter((line) => line.trim() !== "")
		.map((line) => line.trim());

	if (!CONSTANTS.DISABLE_WELCOME_MESSAGE) {
		for (const line of welcomeLines) {
			await Message({ k, c: CONSTANTS, text: line });
		}
	}

	// enable player movement after all welcome message finishes
	enablePlayerMovement();

	// render the scene that plays the game
	const win = await renderScene({
		k,
		c: CONSTANTS,
		deps: { disablePlayerMovement, enablePlayerMovement, collection },
	});

	// depending on result perform the operation
	if (win) {
		Winner({ k, c: CONSTANTS });
	} else {
		Death({ k, c: CONSTANTS });
	}
	disablePlayerMovement();
}

export function useGamePlay({ k, c }) {
	k.scene("gameplay", () => GamePlay({ k, c }));
}
