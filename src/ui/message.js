export async function Message({
	k,
	c,
	text,
	closeHint = "Press space key to continue",
	closeKey = ["space"],
}) {
	return new Promise((resolve) => {
		const bbox = k.add([
			k.rect(k.width() - 20, (k.height() * 1) / 3),
			k.pos(20, k.height()),
			k.anchor("botleft"),
			k.color(0, 0, 0),
			k.animate(),
			"message",
		]);

		const message = bbox.add([
			k.pos(20, -20),
			k.anchor("botleft"),
			k.text(text, {
				size: 18,
				width: bbox.width - 20 * 2, // 2 represents padding on left and right
				lineSpacing: 8,
			}),
			k.color(255, 255, 255),
		]);

		const closeHintMessage = bbox.add([
			k.pos(bbox.width - 20, -20),
			k.anchor("botright"),
			k.text(`[${closeHint}]`, {
				size: 14,
			}),
			k.animate(),
		]);

		// animating the close hint message
		closeHintMessage.animate(
			"pos",
			[
				closeHintMessage.pos,
				closeHintMessage.pos.add(0, -20),
				closeHintMessage.pos.add(0, -5),
				closeHintMessage.pos.add(0, -20),
				closeHintMessage.pos,
			],
			{ duration: 0.75, timing: [0, 0.2, 0.5, 0.8, 1] },
		);

		// animating the apperance of the message
		bbox.animate(
			"pos",
			[
				bbox.pos.add(0, bbox.height), // from the extreme right
				bbox.pos,
			],
			{ duration: 0.3, loops: 1 },
		);

		// adjusting position of height based on position of close hint message
		message.pos.y = closeHintMessage.pos.y - closeHintMessage.height - 20; // 20 distance between message and close hint

		// adjusting message bbox height based on the content occupied
		bbox.height = message.height + closeHintMessage.height + 20 * 2 + 20;

		// handle on press close key
		k.onKeyPress(async (key) => {
			// if closeKey is given then, it must be pressed else every key works
			if (
				!closeKey ||
				(closeKey &&
					closeKey.find((item) => key.toLowerCase() === item.toLowerCase()))
			) {
				k.tween(bbox.pos, bbox.pos.add(0, bbox.height), 0.3, (pos) => {
					bbox.pos = pos;
				});
				k.wait(0.3, () => {
					(k.destroy(bbox), resolve(key));
				});
			}
		});

		return bbox;
	});
}
