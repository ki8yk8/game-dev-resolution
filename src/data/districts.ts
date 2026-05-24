import { District, DistrictState } from "../components/districts";

interface DistrictConfig {
	name: string;
	state: DistrictState;
}

const districtConfig: DistrictConfig[] = [
	{
		name: "Eastwood",
		state: "Stable",
	},
	{
		name: "Northgate",
		state: "Recovery",
	},
	{
		name: "Midtown",
		state: "Riot",
	},
	{
		name: "Harbor",
		state: "Tense",
	},
];

export function getDistricts(): District[] {
	const districts: District[] = districtConfig.map(
		(config, index) =>
			new District(index, config.name, config.state),
	);

	return districts;
}
