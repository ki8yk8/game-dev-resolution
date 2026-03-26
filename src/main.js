import kaplay from "kaplay";
import { useLoader, useGamePlay, useWinScene, useDeathScene } from "./scenes";

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
	PLAYER_SPEED: 400, // in pixels/second
	DISABLE_WELCOME_MESSAGE: false,
	DEVELOPMENT: true,
	AUDIOS,
	SPRITES,
};

// registers the different scenes
useLoader({ k, c: CONSTANTS });
useGamePlay({ k, c: CONSTANTS });
useWinScene({ k, c: CONSTANTS });
useDeathScene({ k, c: CONSTANTS });

// go to the loading screen
k.go("loader");
