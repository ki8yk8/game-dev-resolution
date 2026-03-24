export function Loader({ k, c, sprites, audios }) {
	// set the layer for managing z-index object placement
	k.setLayers(["bg", "obj", "player", "ui"], "obj");

	// loading all the sprites
	Object.entries(sprites).forEach(([key, value]) =>
		k.loadSprite(key, `/sprites/${value}`),
	);

	// loading all the audios
	Object.entries(audios).forEach(([key, value]) =>
		k.loadSound(key, `/audios/${value}`),
	);
}
