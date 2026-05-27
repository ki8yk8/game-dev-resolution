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

export function cumulative(arr: number[]) {
	return arr.map((item, index, arr) => item + sum(arr.slice(0, index)));
}
