import { DistrictForUser } from "../components/districts";
import MarkovCanvas from "../engines/markov/canvas";
import District from "./districts/district";
import ControlButton from "./generic/control-btn";

interface DashboardProps {
	districts: DistrictForUser[];
}

const CANVAS_MAP: Record<string, () => HTMLElement> = {
	engine: MarkovCanvas,
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

	const toolsNav = document.createElement("nav");
	toolsNav.className = "tools__nav";

	toolsNav.appendChild(
		ControlButton({
			icon: "swap-2-line",
			onClick: () => {},
		}),
	);
	toolsNav.appendChild(
		ControlButton({
			icon: "chat-poll-line",
			onClick: () => {},
		}),
	);

	toolsSection.appendChild(toolsNav);

	// tools viewer
	const toolsCanvasSection = document.createElement("section");
	toolsCanvasSection.className = "tools_canvas";
	toolsCanvasSection.appendChild(CANVAS_MAP["engine"]());

	// adding all the elements to dashboard
	dashboardMain.appendChild(districtSection);
	dashboardMain.appendChild(toolsSection);
	dashboardMain.appendChild(toolsCanvasSection);

	return dashboardMain;
}
