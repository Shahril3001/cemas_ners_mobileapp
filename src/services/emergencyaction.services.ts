import { Emergencycall } from '../models/emergencycall.model';
import { Location } from '../models/location.model';
import{Injectable} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {AuthService} from '../services/auth.services';

@Injectable()
export class EmergencyService {

	constructor(private db: AngularFireDatabase,private authService: AuthService){}

	private emergencyRef = this.db.list<Emergencycall>('EmergencyRequest');

	addEmergency(
		sender: string,
		hotlinetype: string,
		emergencydate: any,
		emergencylocation: Location){
		return this.emergencyRef.push(new Emergencycall(sender,hotlinetype, emergencydate, emergencylocation));
	}
	
	getEmergency(){
		let emergencySpec = this.db.list<Emergencycall>('EmergencyRequest' ,ref =>  ref.orderByChild('sender').equalTo(this.authService.getActiveUser()));
		return emergencySpec;
	}

	getEmergency1(){
		return this.emergencyRef;
	}

	deleteEmergency(key: string){
		return this.emergencyRef.remove(key);
	}
}