import { Brightnessmodel } from '../models/brightnessmod.model';
import { Injectable } from '@angular/core';
 
@Injectable()
export class BrightnessService {
	private brightnessmodel: Brightnessmodel[] = []; 

	addBrightness(
		 brightnesslvl: number,
		){
		this.brightnessmodel.push(new Brightnessmodel(brightnesslvl));
	}

	getBrightness(){
		return this.brightnessmodel.slice(); 
	}


	updateBrightness(
		index: any,
		brightnesslvl: number,
		){
		this.brightnessmodel[index] = new Brightnessmodel(brightnesslvl);
	}
}