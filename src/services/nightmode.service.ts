import { Nightmode } from '../models/nightmod.model';
import { Injectable } from '@angular/core';
 
@Injectable()
export class NightmodeService {
	private nightmode: Nightmode[] = []; 

	addNightmode(
		 nightstatus: any,
		){
		this.nightmode.push(new Nightmode(nightstatus));
	}

	getNightmode(){
		return this.nightmode.slice(); 
	}


	updateNightmode(
		index: any,
		nightstatus: any,
		){
		this.nightmode[index] = new Nightmode(nightstatus);
	}
}