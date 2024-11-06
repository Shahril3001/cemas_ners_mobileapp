import { Newcontact } from '../models/ncontact.model';

import { Injectable } from '@angular/core';
 
@Injectable()
export class ContactService {

	private contact: Newcontact[] = []; 
	addContact(
		 displayName: any,  
		 phoneNumbers: any,  

		){
		this.contact.push(new Newcontact(displayName,phoneNumbers));
	}

	getContact(){
		return this.contact.slice(); 
	}

	updateContact(
		index: string,
	 	displayName: any,  
		phoneNumbers: any,  
		){
		this.contact[index] = new Newcontact(displayName,phoneNumbers);
	}

	removeContact(index: number){
		this.contact.splice(index, 1);
	}
}