import "./style.css";

interface GameOverProps {
	hasWon: boolean;
}

export default function GameOver(props: GameOverProps) {
	const canvas = document.createElement("div");
	canvas.className = "gameover__canvas";

	const heroTitle = document.createElement("h1");
	canvas.appendChild(heroTitle);

	const heroDescription = document.createElement("p");
	canvas.appendChild(heroDescription);

	// content
	if (props.hasWon) {
		heroTitle.classList.add("won");
		heroTitle.textContent = "You Won";
		heroDescription.textContent =
			"Congratulations, now you can call yourself a true statistician. Kudos to your knowledge you were able to turn chaotic city into peaceful one.";
	} else {
		heroTitle.classList.add("lost");
		heroTitle.textContent = "You Lost";
		heroDescription.textContent =
			"Whenever the system becomes chaotic, more events are unhandled, it leads to eventual bankrupcy of all the districts. No tokens are left to run the city so, you lost.";
	}

	return canvas;
}
