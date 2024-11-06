import { ScreenAwake } from '../models/awakemod.model';
import { Injectable } from '@angular/core';
 
@Injectable()
export class AwakemodeService {
	private screenmode: ScreenAwake[] = []; 

	addAwakemode(
		 awakestatus: any,
		){
		this.screenmode.push(new ScreenAwake(awakestatus));
	}

	getAwakemode(){
		return this.screenmode.slice(); 
	}


	updateAwakemode(
		index: any,
		awakestatus: any,
		){
		this.screenmode[index] = new ScreenAwake(awakestatus);
	}
}