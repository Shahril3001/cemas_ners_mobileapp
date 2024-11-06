import { Blindmode } from '../models/blindmod.model';
import { Injectable } from '@angular/core';
 
@Injectable()
export class BlindmodeService {
	private blindmode: Blindmode[] = []; 

	addBlindmode(
		 colorblindstatus: any,
		){
		this.blindmode.push(new Blindmode(colorblindstatus));
	}

	getBlindmode(){
		return this.blindmode.slice(); 
	}


	updateBlindmode(
		index: any,
		colorblindstatus: any,
		){
		this.blindmode[index] = new Blindmode(colorblindstatus);
	}
}