import { Player, Wall } from "../objects";
import { WELCOME_MESSAGE } from "../data/scripts";
import { Objects } from "../ui";

// async function GamePlayOld({ k, c }) {
// 	const { player, disablePlayerMovement, enablePlayerMovement } = Player({
// 		k,
// 		c,
// 	});

// 	// bag that stores the collected story items
// 	const collection = [];

// 	// disables player movement while the welcome message is being displayed
// 	disablePlayerMovement();

// 	// extracts the welcome message lines by lines discarding empty strings
// 	const welcomeLines = WELCOME_MESSAGE.split("\n")
// 		.filter((line) => line.trim() !== "")
// 		.map((line) => line.trim());

// 	if (!c.DISABLE_WELCOME_MESSAGE) {
// 		for (const line of welcomeLines) {
// 			await Message({ k, c, text: line });
// 		}
// 	}

// 	// enable player movement after all welcome message finishes
// 	enablePlayerMovement();

// 	// render the scene that plays the game
// 	const win = await renderScene({
// 		k,
// 		c,
// 		deps: { disablePlayerMovement, enablePlayerMovement, collection },
// 	});

// 	// depending on result perform the operation
// 	if (win) {
// 		Winner({ k, c });
// 	} else {
// 		Death({ k, c });
// 	}
// 	disablePlayerMovement();
// }

function GamePlay({ k, c }) {
	const { player, disablePlayerMovement, enablePlayerMovement } = Player({
		k,
		c,
	});
	const collection = [];

	Wall({ k, c, width: 1200, pos: k.vec2(100, 100) });
	const retractableWall = Wall({
		k,
		c,
		width: 200,
		pos: k.vec2(100 + 1200, 100),
		isRetractable: true,
	}); // door
	Wall({
		k,
		c,
		width: 200,
		pos: k.vec2(100 + 1200, 100 - 200),
		isVertical: true,
	});
	Wall({
		k,
		c,
		width: 200,
		pos: k.vec2(100 + 1200 + 232, 100 - 200),
		isVertical: true,
	});
	Wall({ k, c, width: 200, pos: k.vec2(100 + 1200, -100) });

	Wall({ k, c, width: 618, pos: k.vec2(100 + 1200 + 200, 100) });
	Wall({ k, c, width: 600, pos: k.vec2(100, 100), isVertical: true });
	Wall({ k, c, width: 700, pos: k.vec2(100, 700 - 32) });
	Wall({ k, c, width: 300, pos: k.vec2(800, 400), isVertical: true });
	Wall({ k, c, width: 150, pos: k.vec2(800, 400) });
	Wall({ k, c, width: 600, pos: k.vec2(950, 400), isVertical: true });
	Wall({ k, c, width: 400, pos: k.vec2(550, 1000) });
	Wall({ k, c, width: 200, pos: k.vec2(550, 1000), isVertical: true });
	Wall({ k, c, width: 700, pos: k.vec2(518, 1200) });
	Wall({ k, c, width: 500, pos: k.vec2(1218, 700), isVertical: true });
	Wall({ k, c, width: 500, pos: k.vec2(1218, 700) });
	Wall({ k, c, width: 500, pos: k.vec2(1718, 700), isVertical: true });
	Wall({ k, c, width: 600, pos: k.vec2(1686, 1200) });
	Wall({ k, c, width: 200, pos: k.vec2(2300, 1032), isVertical: true });
	Wall({ k, c, width: 150, pos: k.vec2(2300 - 150, 1032) });
	Wall({
		k,
		c,
		width: 966,
		pos: k.vec2(2300 - 150, 1032 - 966 + 32),
		isVertical: true,
	});

	// render the scene that plays the game
	const win = Objects({
		k,
		c,
		deps: { disablePlayerMovement, enablePlayerMovement, collection },
	});
}

export function useGamePlay({ k, c }) {
	k.scene("gameplay", () => GamePlay({ k, c }));
}
