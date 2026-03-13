import kaplay from "kaplay";
import Player from "./objects/player";
import Message from "./ui/message";
import { WELCOME_MESSAGE } from "./ui/scripts";
import renderScene from "./ui/render";

const k = kaplay({
	background: "#eeeeff",
});

k.loadRoot("./");

// set the layer for managing z-index object placement
k.setLayers(["bg", "obj", "player", "ui"], "obj");

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
Object.entries(SPRITES).forEach(([key, value]) =>
	k.loadSprite(key, `/sprites/${value}`),
);

// adds game constatns
const CONSTANTS = {
	PLAYER_SPEED: 200, // in pixels/second
	DISABLE_WELCOME_MESSAGE: true,
};

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
renderScene({
	k,
	c: CONSTANTS,
	deps: { disablePlayerMovement, enablePlayerMovement, collection },
});

// Todo: add await in renderScene() and after it finishes there should be option for playagain
