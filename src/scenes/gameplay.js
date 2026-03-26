import { Player, Map, Objects } from "../objects";
import { WELCOME_MESSAGE } from "../data/scripts";
import { Message } from "../ui";

async function GamePlay({ k, c }) {
	const { player, disablePlayerMovement, enablePlayerMovement } = Player({
		k,
		c,
	});
	Map({ k, c });

	// collection holds all the items stored
	const collection = [];

	// disables player movement while the welcome message is being displayed
	disablePlayerMovement();

	// extracts the welcome message lines by lines discarding empty strings
	const welcomeLines = WELCOME_MESSAGE.split("\n")
		.filter((line) => line.trim() !== "")
		.map((line) => line.trim());

	if (!c.DISABLE_WELCOME_MESSAGE) {
		for (const line of welcomeLines) {
			await Message({ k, c, text: line });
		}
	}

	// enable player movement after all welcome message finishes
	enablePlayerMovement();

	// render the scene that plays the game
	Objects({
		k,
		c,
		deps: { disablePlayerMovement, enablePlayerMovement, collection },
	});
}

export function useGamePlay({ k, c }) {
	k.scene("gameplay", () => GamePlay({ k, c }));
}
