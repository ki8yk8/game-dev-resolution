import { describe, expect, test } from "vitest";
import {
	gatherFourHalves,
	matMul,
	partitionSquareMatrix,
} from "@/utils/matrix";

describe("Matrix can be partitioned and joined", () => {
	const matrix = [
		[1, 2, 3, 4],
		[5, 6, 7, 8],
		[2, 5, 6, 9],
		[1, 5, 7, 0],
	];
	const [a11, a12, a21, a22] = [
		[
			[1, 2],
			[5, 6],
		],
		[
			[3, 4],
			[7, 8],
		],
		[
			[2, 5],
			[1, 5],
		],
		[
			[6, 9],
			[7, 0],
		],
	];

	test("A square matrix can be partitioned", () => {
		const [b11, b12, b21, b22] = partitionSquareMatrix(matrix);
		expect(b11).toStrictEqual(a11);
		expect(b12).toStrictEqual(a12);
		expect(b21).toStrictEqual(a21);
		expect(b22).toStrictEqual(a22);
	});

	test("Four matrix of same dimension can be joined", () => {
		const b = gatherFourHalves(a11, a12, a21, a22);
		expect(b).toStrictEqual(matrix);
	});
});

describe("Square matrix can be multiplied", () => {
	test("Square matrix can be multiplied", () => {
		const a = [
			[1, 2, 0, 1],
			[0, 1, 3, 2],
			[2, 0, 1, 1],
			[1, 1, 1, 0],
		];
		const b = [
			[2, 1, 0, 3],
			[1, 0, 2, 1],
			[3, 1, 1, 0],
			[0, 2, 1, 1],
		];
		const c = [
			[4, 3, 5, 6],
			[10, 7, 7, 3],
			[7, 5, 2, 7],
			[6, 2, 3, 4],
		];

		expect(matMul(a, b)).toStrictEqual(c);
	});
});
