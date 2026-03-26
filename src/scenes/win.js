function WinScene({ k, c }) {
	const winMessage = k.add([
		k.text("You won the game", {
			color: k.rgb(0, 0, 0),
		}),
	]);
}

export function useWinScene({ k, c }) {
	return k.scene("win", () => WinScene({ k, c }));
}
