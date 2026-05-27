export default function Icon(name: string) {
	const i = document.createElement("i");
	i.className = `ri-${name}`;
	return i;
}
