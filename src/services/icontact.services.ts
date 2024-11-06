import { Importcontact } from '../models/icontact.model';
import { Injectable } from '@angular/core';
 
@Injectable()
export class ImportcontactService {
	private importcontactlist: Importcontact[] = []; 

	addContact(
		 displayName: any,  
		 phoneNumbers: any,
		){
		this.importcontactlist.push(new Importcontact(displayName,phoneNumbers));
	}

	getContact(){
		return this.importcontactlist.slice(); 
	}

	removeContact(index: number){
		this.importcontactlist.splice(index, 1);
	}

	isImportContact(importContact:{displayName,phoneNumbers}){
		return this.importcontactlist.find((importContactEl: {displayName, phoneNumbers})=>{
		return importContactEl.displayName == importContact.displayName;
		});
	}

	updateContact(
		index: string,
		displayName: any,  
		phoneNumbers: any,
		){
		this.importcontactlist[index] = new Importcontact(displayName,phoneNumbers);
	}
}