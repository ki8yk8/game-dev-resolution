function matMul(a: number[][], b: number[][]) {
	const m = isSquare(a);
	const n = isSquare(b);

	// check for errors
	if (!m) {
		throw new Error(
			`matMul only accepts square (nxn) matrix where n is exact power of 2, got (${a.length}x${a[0].length})`,
		);
	}
	if (!n) {
		throw new Error(
			`matMul only accepts square (nxn) matrix where n is exact power of 2, got (${a.length}x${a[0].length})`,
		);
	}
	if (m !== n) {
		throw new Error(
			`matMul can only multiply square matrix of same size, ${m} !== ${n}`,
		);
	}

	// use recursive matrix multiplication technique
	if (n === 1) {
		return [a[0][0] * b[0][0]];
	}

	// partition matrix to 4 equal parts
}

function isSquare(a: number[][]): number {
	const [ma, na] = [a.length, a[0].length];

	if (ma !== na || Number.isInteger(Math.sqrt(ma))) {
		return -1;
	}
	return ma;
}

function partitionSquareMatrix(
	a: number[][],
): [number[][], number[][], number[][], number[][]] {
	const n = isSquare(a);
	if (!n) {
		throw new Error(
			`The given matrix is not square, got ${a.length}x${a[0].length}`,
		);
	}

	// partitioning into four halves, a11, a12, a21, a22
	const a1x = a.slice(0, n / 2);
	const a2x = a.slice(n / 2);

	const a11 = a1x.map((row) => row.slice(0, n / 2));
	const a12 = a1x.map((row) => row.slice(n / 2));
	const a21 = a1x.map((row) => row.slice(0, n / 2));
	const a22 = a1x.map((row) => row.slice(n / 2));

	return [a11, a12, a21, a22];
}

function gatherFourHalves(
	a11: number[][],
	a12: number[][],
	a21: number[][],
	a22: number[][],
) {
	const a1x = a11.map((r1, index) => r1.concat(a12[index]));
	const a2x = a21.map((r1, index) => r1.concat(a22[index]));

	return a1x.concat(a2x);
}
