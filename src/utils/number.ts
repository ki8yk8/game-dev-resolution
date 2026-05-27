export const EPSILON = 1e-3;

export function clamp(value: number, min: number, max: number) {
	return Math.max(min, Math.min(value, max));
}
