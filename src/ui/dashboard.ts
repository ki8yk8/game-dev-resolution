import { DistrictForUser } from "../components/districts";
import InterventionCanvas from "../engines/interventions/canvas";
import MarkovCanvas from "../engines/markov/canvas";
import District from "./districts/district";
import ControlButton from "./generic/control-btn";

type Canvas = "markov" | "intervention";

const CANVAS_MAP: Record<Canvas, () => HTMLElement> = {
	markov: MarkovCanvas,
	intervention: InterventionCanvas,
};

interface DashboardProps {
	districts: DistrictForUser[];
}

interface DashboardState {
	openCanvas: Canvas;
}

const dashboardState: DashboardState = {
	openCanvas: "markov",
};

export default function Dashboard(props: DashboardProps) {
	const dashboardMain = document.createElement("main");
	dashboardMain.className = "dashboard";

	// district section
	const districtSection = document.createElement("section");
	districtSection.className = "dashboard__districts";

	props.districts.forEach((district) => {
		districtSection.appendChild(
			District({
				district,
				onClick: () => {},
			}),
		);
	});

	// tools sections
	const toolsSection = document.createElement("section");
	toolsSection.className = "tools";

	const toolsParagraph = document.createElement("p");
	toolsParagraph.className = "tools__p";
	toolsParagraph.textContent = "tools";
	toolsSection.appendChild(toolsParagraph);

	// holds all the tools
	const toolsNav = document.createElement("nav");
	toolsNav.className = "tools__nav";
	toolsSection.appendChild(toolsNav);

	// tools viewer
	const toolsCanvasSection = document.createElement("section");
	toolsCanvasSection.className = "tools_canvas";
	renderToolsCanvas(dashboardState.openCanvas);

	function renderToolsCanvas(canvas: Canvas) {
		dashboardState.openCanvas = canvas;

		// clear all the tools from the menu
		toolsNav.innerHTML = "";

		toolsNav.appendChild(
			ControlButton({
				icon: "swap-2-line",
				onClick: () => renderToolsCanvas("markov"),
				active: dashboardState.openCanvas === "markov",
			}),
		);

		toolsNav.appendChild(
			ControlButton({
				icon: "chat-poll-line",
				onClick: () => renderToolsCanvas("intervention"),
				active: dashboardState.openCanvas === "intervention",
			}),
		);

		// clear and re-render the canvas
		toolsCanvasSection.innerHTML = "";
		toolsCanvasSection.appendChild(CANVAS_MAP[dashboardState.openCanvas]());
	}

	// adding all the elements to dashboard
	dashboardMain.appendChild(districtSection);
	dashboardMain.appendChild(toolsSection);
	dashboardMain.appendChild(toolsCanvasSection);

	return dashboardMain;
}
