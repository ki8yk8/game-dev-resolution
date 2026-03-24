function Loader({ k, c }) {
	// set the layer for managing z-index object placement
	k.setLayers(["bg", "obj", "player", "ui"], "obj");

	// loaded is number which value is between 0 and AUDIOS + SPRITES
	let loaded = 0;
	const total_to_load = Object.entries(c.AUDIOS).length + Object.entries(c.SPRITES).length;

	// loading all the sprites
	Object.entries(c.SPRITES).forEach(async ([key, value]) => {
		await k.loadSprite(key, `/sprites/${value}`);
		loaded = loaded + 1;
		handleObjectLoaded();
	});

	// loading all the audios
	Object.entries(c.AUDIOS).forEach(async ([key, value]) => {
		await k.loadSound(key, `/audios/${value}`);
		loaded = loaded + 1;
		handleObjectLoaded();
	});

	function handleObjectLoaded() {
		if (loaded === total_to_load) {
			k.go("gameplay");
		}
	}
}

export function useLoader({ k, c }) {
	k.scene("loader", () => Loader({ k, c }));
}
