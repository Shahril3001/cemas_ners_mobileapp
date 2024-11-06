import { Location } from '../models/location.model';

export class Emergencycall{

	constructor(
		public sender: string,
		public hotlinetype: string,
		public emergencydate: string,
		public emergencylocation: Location
		){} 
}