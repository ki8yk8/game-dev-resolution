function Loader({ k, c }) {
	// set the layer for managing z-index object placement
	k.setLayers(["bg", "obj", "player", "ui"], "obj");

	// loading all the sprites
	Object.entries(c.SPRITES).forEach(([key, value]) =>
		k.loadSprite(key, `/sprites/${value}`),
	);

	// loading all the audios
	Object.entries(c.AUDIOS).forEach(([key, value]) =>
		k.loadSound(key, `/audios/${value}`),
	);
}

export function useLoader({ k, c }) {
	k.scene("loader", () => Loader({ k, c }));
}
