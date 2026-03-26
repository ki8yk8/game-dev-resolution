import { Wall } from "./wall";

export function Map({ k, c }) {
	Wall({ k, c, width: 1200, pos: k.vec2(100, 100) });
	const retractableWall = Wall({
		k,
		c,
		width: 200,
		pos: k.vec2(100 + 1200, 100),
		isRetractable: true,
	}); // door
	Wall({
		k,
		c,
		width: 200,
		pos: k.vec2(100 + 1200, 100 - 200),
		isVertical: true,
	});
	Wall({
		k,
		c,
		width: 200,
		pos: k.vec2(100 + 1200 + 232, 100 - 200),
		isVertical: true,
	});
	Wall({ k, c, width: 200, pos: k.vec2(100 + 1200, -100) });

	Wall({ k, c, width: 618, pos: k.vec2(100 + 1200 + 200, 100) });
	Wall({ k, c, width: 600, pos: k.vec2(100, 100), isVertical: true });
	Wall({ k, c, width: 700, pos: k.vec2(100, 700 - 32) });
	Wall({ k, c, width: 300, pos: k.vec2(800, 400), isVertical: true });
	Wall({ k, c, width: 150, pos: k.vec2(800, 400) });
	Wall({ k, c, width: 600, pos: k.vec2(950, 400), isVertical: true });
	Wall({ k, c, width: 400, pos: k.vec2(550, 1000) });
	Wall({ k, c, width: 200, pos: k.vec2(550, 1000), isVertical: true });
	Wall({ k, c, width: 700, pos: k.vec2(518, 1200) });
	Wall({ k, c, width: 500, pos: k.vec2(1218, 700), isVertical: true });
	Wall({ k, c, width: 500, pos: k.vec2(1218, 700) });
	Wall({ k, c, width: 500, pos: k.vec2(1718, 700), isVertical: true });
	Wall({ k, c, width: 600, pos: k.vec2(1686, 1200) });
	Wall({ k, c, width: 200, pos: k.vec2(2300, 1032), isVertical: true });
	Wall({ k, c, width: 150, pos: k.vec2(2300 - 150, 1032) });
	Wall({
		k,
		c,
		width: 966,
		pos: k.vec2(2300 - 150, 1032 - 966 + 32),
		isVertical: true,
	});
}
