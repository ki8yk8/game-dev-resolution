export function Wall({
	k,
	c,
	pos,
	width = 100,
	isVertical = false,
	isPassThrough = false,
}) {
	const wall = k.add([
		k.rect(width, 32),
		k.color(0, 0, 0),
		k.opacity(1),
		k.anchor("topleft"),
		k.rotate(0),
		k.pos(pos),
		k.layer("obj"),
		k.area(),
		k.body({
			isStatic: true,
		}),
		["body", isPassThrough ? "body--door" : null],
	]);

	if (isPassThrough) {
		wall.opacity = 0.9;
		wall.unuse("body");
	}

	function enablePassThrough() {
		wall.opacity = 0.9;
		wall.unuse("body");
	}

	// rotate for vertical walls
	if (isVertical) wall.angle = 90;

	return { wall, enablePassThrough };
}
