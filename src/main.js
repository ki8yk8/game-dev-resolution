import kaplay from "kaplay";
import Player from "./objects/player";
import Message from "./ui/message";
import { WELCOME_MESSAGE } from "./ui/scripts";

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
};
Object.entries(SPRITES).forEach(([key, value]) =>
	k.loadSprite(key, `/sprites/${value}`),
);

// adds game constatns
const CONSTANTS = {
	PLAYER_SPEED: 200, // in pixels/second
};

const player = Player({ k, c: CONSTANTS });

// extracts the welcome message lines by lines discarding empty strings
const welcomeLines = WELCOME_MESSAGE.split("\n")
	.filter((line) => line.trim() !== "")
	.map((line) => line.trim());

for (const line of welcomeLines) {
	await Message({ k, c: CONSTANTS, text: line });
}
