export function Portal({ k, c }) {
	const portal = k.add([
		k.sprite("portal"),
		k.pos(2200, 1100),
		k.area(),
		k.animate(),
	]);

	portal.onCollide("player", async (player) => {
		await k.tween(k.vec2(1.0), k.vec2(0.0), 0.5, (s) => (portal.scale = s));
		k.destroy(portal);

		const playerPosX = player.pos.x;
		k.tween(0, 1, 1, (i) => {
			const pos = k.map(i, 0, 1, playerPosX, playerPosX + 400);
			player.pos.x = pos;
			player.scale = k.vec2(1 - i);
		});
		k.wait(0.9, () => k.go("win"));
	});
}
