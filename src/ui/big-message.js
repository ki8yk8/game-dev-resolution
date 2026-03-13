export default function BigMessage({ k, c, message, color }) {
	const bbox = k.add([
		k.rect(10, 10, {
			radius: 20,
		}),
		k.pos(k.width() / 2, k.height() / 2),
		k.color(color),
		k.anchor("center"),
		k.rotate(),
		k.animate(),
		k.layer("ui"),
	]);

	const text = bbox.add([
		k.text(message, {
			size: 36,
		}),
		k.anchor("center"),
	]);

	// updating the size of bbox
	bbox.width = text.width + 80;
	bbox.height = text.height + 40;

	// animate the winner bbox
	bbox.animate("angle", [0, -2, 0, 2, 0], { duration: 4 });
	bbox.animate(
		"scale",
		[k.vec2(1.0), k.vec2(0.95), k.vec2(1.05), k.vec2(1.0)],
		{ duration: 2 },
	);

	return bbox;
}
