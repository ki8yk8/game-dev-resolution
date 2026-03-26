export function Wall({
	k,
	c,
	pos,
	width = 100,
	isVertical = false,
	isRetractable = false,
}) {
	const wall = k.add([
		k.rect(width, 32),
		k.color(0, 0, 0),
		k.anchor("topleft"),
		k.rotate(0),
		k.pos(pos),
		k.layer("obj"),
		k.area(),
		k.body({
			isStatic: true,
		}),
		["body", isRetractable ? "body--door" : null],
	]);

	if (isRetractable && c.DEVELOPMENT) {
		wall.color = k.rgb(255, 200, 0);
	}

	// rotate for vertical walls
	if (isVertical) wall.angle = 90;

	return wall;
}
