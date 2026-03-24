function Loader({ k, c }) {
	// set the layer for managing z-index object placement
	k.setLayers(["bg", "obj", "player", "ui"], "obj");

	// creating the scene with black background
	const backdrop = k.add([
		k.rect(k.width(), k.height()),
		k.pos(k.width() / 2, k.height() / 2),
		k.anchor("center"),
		k.color(10, 10, 10),
		k.layer("bg"),
	]);

	// adding a progress bar
	const progressWrapper = backdrop.add([
		k.rect((k.width() * 2) / 3, 40),
		k.color(255, 255, 255),
		k.anchor("topleft"),
		k.pos(0, -20),
	]);
	progressWrapper.pos.x -= progressWrapper.width / 2;

	// width = 10 to progressWrapper.width -10
	const progress = progressWrapper.add([
		k.rect(10, progressWrapper.height - 10),
		k.pos(5, 5),
		k.anchor("topleft"),
		k.color(0, 0, 0),
	]);

	// loaded is number which value is between 0 and AUDIOS + SPRITES
	let loaded = 0;
	const total_to_load =
		Object.entries(c.AUDIOS).length + Object.entries(c.SPRITES).length;

	// loading all the sprites
	Object.entries(c.SPRITES).forEach(async ([key, value]) => {
		await k.loadSprite(key, `/sprites/${value}`);
		k.wait(0.5, () => {
			loaded = loaded + 1;
			handleObjectLoaded();
		});
	});

	// loading all the audios
	Object.entries(c.AUDIOS).forEach(async ([key, value]) => {
		await k.loadSound(key, `/audios/${value}`);
		k.wait(1, () => {
			loaded = loaded + 1;
			handleObjectLoaded();
		});
	});

	// activates gameplay once loaded
	function handleObjectLoaded() {
		progress.width = k.map(
			loaded,
			0,
			total_to_load,
			10,
			progressWrapper.width - 10,
		);
		if (loaded === total_to_load) {
			k.go("gameplay");
		}
	}
}

export function useLoader({ k, c }) {
	k.scene("loader", () => Loader({ k, c }));
}
