export const ALPHABETS = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
];

export function prepareChoiceMessage(choices) {
	const choicesWithPrefix = choices.map(
		(choice, i) => `(${ALPHABETS[i]}). ${choice}`,
	);
	return choicesWithPrefix.join("        ");
}
