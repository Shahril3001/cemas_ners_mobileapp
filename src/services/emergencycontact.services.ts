import { Injectable } from '@angular/core';
import {EmergencyContact} from '../models/emergencycontact.model';
import {AuthService} from '../services/auth.services';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class EmergencycontactService {
	constructor(private db: AngularFireDatabase,private authService: AuthService){
	}

	private EmerContactRef = this.db.list<EmergencyContact>('EmergencyContact');

	addEmercontact( 

		contactName: string,
		contactNumber: string,
		email: string,

		){
		return this.EmerContactRef.push(new EmergencyContact(contactName, contactNumber, email));
	}
	
	getEmercontact(){
		let emercontactlist = this.db.list<EmergencyContact>('EmergencyContact' ,ref =>  ref.orderByChild('email').equalTo(this.authService.getActiveUser()));
		return emercontactlist;
	}

	deleteEmercontact(key: string){
		return this.EmerContactRef.remove(key);
	}
}