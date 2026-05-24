export function matMul(a: number[][], b: number[][]): number[][] {
	const m = isSquare(a);
	const n = isSquare(b);

	// check for errors
	if (!m || !Number.isInteger(m)) {
		throw new Error(
			`matMul only accepts square (nxn) matrix where n is exact power of 2, got (${a.length}x${a[0].length})`,
		);
	}
	if (!n || !Number.isInteger(n)) {
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
		return [[a[0][0] * b[0][0]]];
	}

	// partition matrix to 4 equal parts
	const [a11, a12, a21, a22] = partitionSquareMatrix(a);
	const [b11, b12, b21, b22] = partitionSquareMatrix(b);

	const c11 = add(matMul(a11, b11), matMul(a12, b21));
	const c12 = add(matMul(a11, b12), matMul(a12, b22));
	const c21 = add(matMul(a21, b11), matMul(a22, b21));
	const c22 = add(matMul(a21, b12), matMul(a22, b22));

	return gatherFourHalves(c11, c12, c21, c22);
}

export function add(a: number[][], b: number[][]): number[][] {
	if (a.length !== b.length || a[0].length !== b[0].length) {
		throw new Error(
			`Two matrix should be of same shape for addition, got ${a.length}x${a[0].length} and ${b.length}x${b[0].length}`,
		);
	}

	return a.map((row, i) => row.map((val, j) => val + b[i][j]));
}

export function isSquare(a: number[][]): number {
	const [ma, na] = [a.length, a[0].length];
	return ma == na ? ma : -1;
}

export function partitionSquareMatrix(
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
	const a21 = a2x.map((row) => row.slice(0, n / 2));
	const a22 = a2x.map((row) => row.slice(n / 2));

	return [a11, a12, a21, a22];
}

export function gatherFourHalves(
	a11: number[][],
	a12: number[][],
	a21: number[][],
	a22: number[][],
) {
	const a1x = a11.map((r1, index) => r1.concat(a12[index]));
	const a2x = a21.map((r1, index) => r1.concat(a22[index]));

	return a1x.concat(a2x);
}

export function transpose(a: number[][]): number[][] {
	return a[0].map((_, colIndex) => a.map((row) => row[colIndex]));
}
