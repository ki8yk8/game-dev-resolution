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

	return deathScreen;
}
