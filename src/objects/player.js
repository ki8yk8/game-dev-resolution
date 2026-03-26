export function Player({ k, pos = [1800, 1000], c }) {
	const player = k.add([
		k.pos(pos),
		k.sprite("bean"),
		k.scale(1),
		k.animate(),
		k.area(),
		k.body(),
		k.layer("player"),
		"player",
	]);

	// captures when player was last moved if not moved for 2 second then, play player idle animation
	let playerIdleTime = 0;
	const IDLE_THRESHOLD = 1; // in seconds
	let isIdleAnimationRunning = false;

	player.onUpdate(() => {
		let currrentPosition = player.pos.clone();
		let initialPosition = player.pos.clone();

		if (!player.is("disabled")) {
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
		}

		// restricts the movement of player within the gameplay canvas
		player.pos.x = currrentPosition.x;
		player.pos.y = currrentPosition.y;

		// check if the player has moved or not and change player idle time accordingly
		if (player.pos.eq(initialPosition)) {
			playerIdleTime += k.dt();
		} else {
			playerIdleTime = 0;

			if (isIdleAnimationRunning) {
				player.unanimate("scale");
				isIdleAnimationRunning = false;
				player.scale = k.vec2(1);
			}
		}

		// play animation if player has exceed the threshold
		if (playerIdleTime >= IDLE_THRESHOLD && !isIdleAnimationRunning) {
			player.animate("scale", [k.vec2(1), k.vec2(1.1), k.vec2(1)], {
				duration: 1,
			});
			isIdleAnimationRunning = true;
		}

		// camera follows the player
		k.setCamPos(player.worldPos());
	});

	function disablePlayerMovement() {
		player.tag("disabled");
	}

	function enablePlayerMovement() {
		if (player.is("disabled")) player.untag("disabled");
	}

	return { player, disablePlayerMovement, enablePlayerMovement };
}
