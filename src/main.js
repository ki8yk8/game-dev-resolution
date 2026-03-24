import kaplay from "kaplay";
import { WELCOME_MESSAGE } from "./data/scripts";
import { Player } from "./objects";
import { Loader, renderScene } from "./scenes";
import { Death, Winner } from "./ui";

const k = kaplay({
	background: "#eeeeff",
});

k.loadRoot("./");

const SPRITES = {
	bean: "bean.png",
	bridge: "bridge.png",
	crystal: "crystal.png",
	idol: "idol.png",
	mushroom: "mushroom.png",
	potion: "potion.png",
	scroll: "scroll.png",
	sword: "sword.png",
	zombie: "zombie.png",
};

const AUDIOS = {
	bgm: "bgm.mp3",
	capture: "capture.mp3",
	death: "death.mp3",
	step: "step.mp3",
};

// adds game constatns
const CONSTANTS = {
	PLAYER_SPEED: 200, // in pixels/second
	DISABLE_WELCOME_MESSAGE: true,
};

// loads the loader scenes
Loader({ k, c: CONSTANTS, sprites: SPRITES, audios: AUDIOS });

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
