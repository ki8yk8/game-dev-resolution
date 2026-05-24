import { District, DistrictState } from "../components/districts";

const districtConfig: string[] = ["Eastwood", "Northgate", "Midtown", "Harbor"];

export function getDistricts(): District[] {
	const districts: District[] = districtConfig.map(
		(name, index) => new District(index, name),
	);

	return districts;
}
