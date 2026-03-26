function WinScene({ k, c }) {
	const winMessage = k.add([
		k.text("You won the game"),
		k.color(0, 0, 0),
		k.pos(k.width()/2, k.height()/2),
		k.anchor("center"),
		k.layer("ui"),
	]);
}

export function useWinScene({ k, c }) {
	return k.scene("win", () => WinScene({ k, c }));
}
