export function Wall({ k, c, pos, width = 100, isVertical = false }) {
	const wall = k.add([
		k.rect(width, 32),
		k.color(0, 0, 0),
		k.anchor("topleft"),
		k.rotate(0),
		k.pos(pos),
	]);

	if (isVertical) wall.angle = 90;

	return wall;
}
