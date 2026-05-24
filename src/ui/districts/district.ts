import "./style.css";

import type {
	DistrictForUser,
	DistrictState,
} from "../../components/districts";

const COLORMAP: Record<DistrictState, string> = {
	Stable: "var(--light-blue)",
	Tense: "var(--light-olive)",
	Riot: "var(--light-red)",
	Recovery: "var(--light-green)",
};

interface DistrictProps {
	district: DistrictForUser;
	onClick: (id: number) => void;
}

export default function District(props: DistrictProps): HTMLButtonElement {
	const districtButton = document.createElement("button");
	districtButton.className = "district_card";
	districtButton.style.backgroundColor = COLORMAP[props.district.state];
	districtButton.onclick = () => props.onClick(props.district.id);

	const districtTitle = document.createElement("p");
	districtTitle.className = "district_card__title";
	districtTitle.textContent = props.district.name;

	const districtState = document.createElement("p");
	districtState.className = "district_card__state";
	districtState.textContent = props.district.state;

	districtButton.appendChild(districtTitle);
	districtButton.appendChild(districtState);

	return districtButton;
}
