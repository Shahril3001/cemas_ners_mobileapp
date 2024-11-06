import { Injectable } from '@angular/core';
import { Hotlines } from '../models/hotline.model';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class HotlineService {

	private hotlinesRef = this.db.list<Hotlines>('hotlines');
	constructor(private db: AngularFireDatabase){}

	addHotline(
		imageurl: any,
		name: string, 
		phone: string,
		colour: any,
		){
		return this.hotlinesRef.push(new Hotlines(imageurl, name, phone, colour));
	}

	getHotline(){
		return this.hotlinesRef;
	}

	deleteHotline(key: string){
		return this.hotlinesRef.remove(key);
	}
}