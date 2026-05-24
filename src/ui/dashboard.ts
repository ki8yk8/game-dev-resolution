import { DistrictForUser } from "../components/districts";
import District from "./districts/district";

interface DashboardProps {
	districts: DistrictForUser[];
}

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

	dashboardMain.appendChild(districtSection);

	return dashboardMain;
}
