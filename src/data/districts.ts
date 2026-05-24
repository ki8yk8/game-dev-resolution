import { District, DistrictState } from "../components/districts";

interface DistrictConfig {
	name: string;
	state: DistrictState;
	color: string;
}

const districtConfig: DistrictConfig[] = [];

export function getDistricts(): District[] {
	const districts: District[] = districtConfig.map(
		(config, index) =>
			new District(index, config.name, config.color, config.state),
	);

	return districts;
}
