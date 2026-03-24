import kaplay from "kaplay";
import { useLoader, useGamePlay } from "./scenes";

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
	web: "web.png",
	steel: "steel.png",
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
	AUDIOS,
	SPRITES,
};

// registers the different scenes
useLoader({ k, c: CONSTANTS });
useGamePlay({ k, c: CONSTANTS });

k.go("loader");
