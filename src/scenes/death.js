function DeathScene({ k, c }) {
	k.add([
		k.text("You lost the game"),
		k.color(0, 0, 0),
		k.pos(k.width()/2, k.height()/2),
		k.anchor("center"),
		k.layer("ui"),
	]);
}

export function useDeathScene({ k, c }) {
	return k.scene("death", () => DeathScene({ k, c }));
}
