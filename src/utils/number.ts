export const EPSILON = 1e-3;

export function clamp(value: number, min: number, max: number) {
	return Math.max(min, Math.min(value, max));
}

export function sum(arr: number[]) {
	return arr.reduce((prev, curr) => prev + curr);
}

export function normalize(arr: number[]) {
	const Z = arr.map((a) => Math.exp(a));
	const Z_sum = sum(Z);

	return Z.map((z) => z / Math.max(Z_sum, EPSILON));
}

export function randn(lower: number = 0, upper: number = 1) {
	return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

export function cumulative(arr: number[]) {
	let total = 0;

	return arr.map((item) => {
		total += item;
		return total;
	});
}
