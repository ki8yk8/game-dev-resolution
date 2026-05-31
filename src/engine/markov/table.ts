import { TransitionMatrix } from ".";

import type { DistrictState } from "@/game/type";

interface TransitionMatrixTableProps {
	matrix: TransitionMatrix;
	fogRevaled: boolean;
	state: DistrictState;
}

export default function TransitionMatrixTableUI(
	props: TransitionMatrixTableProps,
): HTMLElement {
	// if fog is not revelead then, for the curent state transition hide the values with xx
	if (!props.fogRevaled) {
		props.matrix = { ...props.matrix };
		const keys = Object.keys(props.matrix[props.state]);
		const values = [Infinity, Infinity, Infinity];

		const foggedTransitionEntries = values.map((item, index) => [
			keys[index],
			item,
		]);
		const foggedTransition = Object.fromEntries(foggedTransitionEntries);

		props.matrix[props.state] = foggedTransition;
	}

	const table = document.createElement("table");
	table.className = "markov_table";

	// header
	table.appendChild(createTableHeader(props.matrix));

	// append the value for each entry
	Object.entries(props.matrix).map((entry) => {
		const [from, transitions] = entry;
		table.appendChild(createTableRow(from, transitions));
	});

	return table;
}

function createTableHeader(matrix: TransitionMatrix): HTMLElement {
	const tr = document.createElement("tr");
	const states = Object.keys(matrix);

	// first empty cell
	const th = document.createElement("th");
	tr.appendChild(th);

	states.forEach((state) => {
		const th = document.createElement("th");
		tr.appendChild(th);
		th.textContent = state;
	});

	return tr;
}

function createTableRow(
	state: string,
	values: Record<string, number>,
): HTMLElement {
	const tr = document.createElement("tr");

	// first cell with the state
	const th = document.createElement("th");
	tr.appendChild(th);
	th.textContent = state;

	// add the values
	Object.values(values).forEach((value) => {
		const td = document.createElement("td");
		tr.appendChild(td);

		if (isFinite(value)) {
			td.textContent = `${Math.floor(value * 100)}%`;
		} else {
			td.textContent = "xxx";
		}
	});

	return tr;
}
