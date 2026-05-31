import MarkovCanvas from "@/ui/canvas/panels/markov";
import DistrictUI from "@/ui/canvas/districts";
import ControlButton from "@/ui/components/control-btn";

import type { Canvas, DashboardProps, DashboardState } from "../type";
import PoissonCanvas from "../panels/poisson";
import { Purchase } from "@/game/type";

const dashboardState: DashboardState = {
	openCanvas: "markov",
	activeDistrict: 0,
	fogRevealed: [],
};

export default function Dashboard(props: DashboardProps) {
	function handleRevealPurchase(item: Purchase) {
		props.onPurchase(item);
		dashboardState.fogRevealed.push(
			props.districts[dashboardState.activeDistrict].name,
		);
	}

	const dashboardMain = document.createElement("main");
	dashboardMain.className = "dashboard";

	// district section
	const districtSection = document.createElement("section");
	districtSection.className = "dashboard__districts";

	props.districts.forEach((district) => {
		districtSection.appendChild(
			DistrictUI({
				district,
				onClick: () => {
					dashboardState.activeDistrict = district.id;
					renderToolsCanvas(dashboardState.openCanvas);
				},
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

		toolsNav.appendChild(
			ControlButton({
				icon: "flask-line",
				onClick: () => renderToolsCanvas("poisson"),
				active: dashboardState.openCanvas === "poisson",
			}),
		);

		// clear and re-render the canvas
		toolsCanvasSection.innerHTML = "";
		if (dashboardState.openCanvas === "markov") {
			const markovCanvas = MarkovCanvas({
				district: props.districts[dashboardState.activeDistrict],
				onRevealPurchase: handleRevealPurchase,
				fogRevealed: dashboardState.fogRevealed.find(
					(item) =>
						item === props.districts[dashboardState.activeDistrict].name,
				)
					? true
					: false,
			});
			toolsCanvasSection.appendChild(markovCanvas);
		} else if (dashboardState.openCanvas === "poisson") {
			const poissionCanvas = PoissonCanvas({
				districts: props.districts,
				activeIndex: dashboardState.activeDistrict,
				eventLog: [],
			});
			toolsCanvasSection.appendChild(poissionCanvas);
		}
	}

	// adding all the elements to dashboard
	dashboardMain.appendChild(districtSection);
	dashboardMain.appendChild(toolsSection);
	dashboardMain.appendChild(toolsCanvasSection);

	return dashboardMain;
}
