import kaplay from "kaplay";
import Player from "./objects/player";
import Message from "./ui/message";

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

const welcomeMessage = "Welcome to the jungle world, here is something excting for you this is something you would love. this is a welcome message meant to overflow for testing purposes."

const message = Message({ k, c: CONSTANTS, text: welcomeMessage });
