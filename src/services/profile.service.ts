import { Injectable } from '@angular/core';
import {Profile} from '../models/profile.model';
import {AuthService} from '../services/auth.services';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class ProfileService {
	constructor(private db: AngularFireDatabase,private authService: AuthService){
	}

	private AccountRef = this.db.list<Profile>('profile');

	addProfile( 

		address: string,
		bloodgroup: string,
		bruhims_no: string,
		dateofbirth: string,
		email: string,
		gender: string,
		icnumber: string,
		marriage_status: string,
		name: string,
		nationality: string,
		occupation: string,
		password: string,
		phone: string,
		race: string,
		photo_urls:string

		){
		return this.AccountRef.push(new Profile(address, bloodgroup, bruhims_no, dateofbirth, email, gender, icnumber, marriage_status, name,nationality, occupation, password, phone, race, photo_urls));
	}
	
	getuserprofile(){
		let profilelist = this.db.list<Profile>('profile' ,ref =>  ref.orderByChild('email').equalTo(this.authService.getActiveUser()));
		return profilelist;
	}

	editProfile(
		key: string,
		address: string,
		bloodgroup: string,
		bruhims_no: string,
		dateofbirth: string,
		email: string,
		gender: string,
		icnumber: string,
		marriage_status: string,
		name: string,
		nationality: string,
		occupation: string,
		password: string,
		phone: string,
		race: string,
		photo_urls:string
		){
		return this.AccountRef.update(key, new Profile(address, bloodgroup, bruhims_no, dateofbirth, email, gender, icnumber, marriage_status, name,nationality, occupation, password, phone, race, photo_urls));
	}

	deleteProfile(key: string){
		return this.AccountRef.remove(key);
	}
}