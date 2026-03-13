import kaplay from "kaplay";
import Player from "./objects/player";

const k = kaplay({
	background: "#eeeeff",
});

k.loadRoot("./");
k.loadSprite("bean", "/sprites/bean.png");

// adds game constatns
const CONSTANTS = {
	PLAYER_SPEED: 200, // in pixels/second
};

Player({ k, c: CONSTANTS });
