export default function Player({ k, pos = [120, 80], c }) {
	const player = k.add([k.pos(pos), k.sprite("bean")]);
	player.onUpdate(() => {
		let currrentPosition = player.pos;

		if (k.isKeyDown("left")) {
			currrentPosition = currrentPosition.add(-c.PLAYER_SPEED * k.dt(), 0);
		}
		if (k.isKeyDown("right")) {
			currrentPosition = currrentPosition.add(c.PLAYER_SPEED * k.dt(), 0);
		}
		if (k.isKeyDown("up")) {
			currrentPosition = currrentPosition.add(0, -c.PLAYER_SPEED * k.dt());
		}
		if (k.isKeyDown("down")) {
			currrentPosition = currrentPosition.add(0, c.PLAYER_SPEED * k.dt());
		}

		// restricts the movement of player within the gameplay canvas
		player.pos.x = k.clamp(currrentPosition.x, 0, k.width() - player.width);
		player.pos.y = k.clamp(currrentPosition.y, 0, k.height() - player.height);
	});
}
