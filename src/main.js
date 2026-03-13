import kaplay from "kaplay";

const k = kaplay({
	background: "#eeeeff",
});

k.loadRoot("./");
k.loadSprite("bean", "/sprites/bean.png");

const PLAYER_SPEED = 200; // in pixels/second

const player = k.add([k.pos(120, 80), k.sprite("bean")]);
player.onUpdate(() => {
	let currrentPosition = player.pos;

	if (k.isKeyPressed("left")) {
		currrentPosition = currrentPosition.add(-PLAYER_SPEED*k.dt(),0)
	}
	if (k.isKeyPressed("right")) {
		currrentPosition = currrentPosition.add(PLAYER_SPEED*k.dt(),0)
	}
	if (k.isKeyPressed("up")) {
		currrentPosition = currrentPosition.add(0, -PLAYER_SPEED*k.dt())
	}
	if (k.isKeyPressed("down")) {
		currrentPosition = currrentPosition.add(0, PLAYER_SPEED*k.dt())
	}

	player.pos = currrentPosition;
})
