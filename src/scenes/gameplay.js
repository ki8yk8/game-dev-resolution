import { Player, Wall } from "../objects";
import { WELCOME_MESSAGE } from "../data/scripts";
import { renderScene } from "../ui";

async function GamePlayOld({ k, c }) {
	const { player, disablePlayerMovement, enablePlayerMovement } = Player({
		k,
		c,
	});

	// bag that stores the collected story items
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
	const win = await renderScene({
		k,
		c,
		deps: { disablePlayerMovement, enablePlayerMovement, collection },
	});

	// depending on result perform the operation
	if (win) {
		Winner({ k, c });
	} else {
		Death({ k, c });
	}
	disablePlayerMovement();
}

function GamePlay({ k, c }) {
	const { player, disablePlayerMovement, enablePlayerMovement } = Player({
		k,
		c,
	});

	Wall({ k, c, pos: k.vec2(100, 100) });
	Wall({ k, c, pos: k.vec2(100, 100), isVertical: true });
}

export function useGamePlay({ k, c }) {
	k.scene("gameplay", () => GamePlay({ k, c }));
}
