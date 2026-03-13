export default function Death({ k, c }) {
	const deathScreen = k.add([
		k.rect(k.width(), k.height()),
		k.anchor("topleft"),
		k.pos(0, 0),
		k.color(0, 0, 0),
		k.opacity(1),
		k.animate(),
		k.layer("ui"),
	]);

	// adds flicker animation
	deathScreen.animate("opacity", [0.5, 0, 0.5, 0.5], {
		duration: 1,
		timing: [0, 1 / 4, 1 / 2, 1],
	});

	// get and delete the player
	const player = k.get("player")[0];
	const playerPos = player.pos.clone();
	k.destroy(player);

	// add dead version of the player
	const zombie = k.add([
		k.sprite("zombie"),
		k.pos(playerPos),
		k.anchor("bot"),
		k.animate(),
		k.rotate(0),
	]);
	zombie.animate("angle", [0, -5, 0, 5, 0], { duration: 2 });

	return deathScreen;
}
