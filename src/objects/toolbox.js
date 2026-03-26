export function Toolbox({ k, c }) {
	const collections = [];

	const toolBoxWrapper = k.add([
		k.fixed(),
		k.layer("ui"),
		k.pos(0, 0),
		k.anchor("topleft"),
	]);

	const toolbox = toolBoxWrapper.add([k.sprite("toolbox"), k.pos(0, 0)]);

	const toolBoxCounter = toolBoxWrapper.add([
		k.rect(24, 24, { radius: 12 }),
		k.color(0, 0, 0),
		k.anchor("center"),
		k.pos(toolbox.pos.x + toolbox.width, toolbox.pos.y + toolbox.height),
	]);

	const count = toolBoxCounter.add([
		k.text("0", {
			size: 14,
		}),
		k.color(255, 255, 255),
		k.anchor("center"),
	]);

	function addToCollection(item) {
		collections.push(item);

		// since the number of items has changed the toolbox counter needs to be updated
		count.text = `${collections.length}`;
	}

	return { collections, addToCollection };
}
