import BigMessage from "./big-message";

export default function Winner({ k, c }) {
	BigMessage({ k, c, message: "Door Opens, YOU WIN!!", color: [24, 184, 66] });
}
