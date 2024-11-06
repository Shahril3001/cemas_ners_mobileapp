import { Pincontact } from '../models/pcontact.model';
import { Injectable } from '@angular/core';
 
@Injectable()
export class PincontactService {
	private pincontactlist: Pincontact[] = []; 


	addPincontact(
		 displayName: any,  
		 phoneNumbers: any,
		){
		this.pincontactlist.push(new Pincontact(displayName,phoneNumbers));
	}

	getPincontact(){
		return this.pincontactlist.slice(); 
	}

	removePincontact(index: number){
		this.pincontactlist.splice(index, 1);
	}

	isPincontact(pincontact:{displayName,phoneNumbers}){
		return this.pincontactlist.find((pincontactEl: {displayName, phoneNumbers})=>{
		return pincontactEl.displayName == pincontact.displayName;
		});
	}

	updatePincontact(
		index: string,
		displayName: any,  
		phoneNumbers: any,
		){
		this.pincontactlist[index] = new Pincontact(displayName,phoneNumbers);
	}
}