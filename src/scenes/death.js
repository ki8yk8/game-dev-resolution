function DeathScene({ k, c }) {
	const deathMessage = k.add([
		k.text("You died", {
			color: k.rgb(0, 0, 0),
		}),
	]);
}

export function useDeathScene({ k, c }) {
	return k.scene("death", () => DeathScene({ k, c }));
}
