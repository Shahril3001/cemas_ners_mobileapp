import { Component } from '@angular/core';
import { NavController, NavParams, ViewController} from 'ionic-angular';
import { Emergencycall } from '../../models/emergencycall.model';
import { NativeGeocoder,NativeGeocoderOptions,NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

@Component({
  selector: 'page-viewalert',
  templateUrl: 'viewalert.html',
})
export class ViewalertPage {
	emergency: Emergencycall;
  	geoAddress: string;

  	geoencoderOptions: NativeGeocoderOptions = {
	    useLocale: true,
	    maxResults: 5
	};


  	constructor(
  		public navCtrl: NavController,
  		private viewCtrl: ViewController,
  		private nativeGeocoder: NativeGeocoder,
  		public navParams: NavParams
      ) {}
	
  ngOnInit(){
		this.emergency = this.navParams.get("emergency");	
    this.getGeoencoder(this.emergency.emergencylocation.lat,this.emergency.emergencylocation.lng)
	}

    getGeoencoder(latitude,longitude){
      this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderReverseResult[]) => {
        this.geoAddress = this.generateAddress(result[0]);
        console.log (this.geoAddress);

      })
      .catch((error: any) => {
        alert('Error getting location '+ JSON.stringify(error));
      });
          
    }
  
    generateAddress(addressObj){
        let obj = [];
        let address = "";
        for (let key in addressObj) {
          obj.push(addressObj[key]);
        }
        obj.reverse();
        for (let val in obj) {
          if(obj[val].length)
          address += obj[val]+', ';
        }
      return address.slice(0, -2);
    }

	onLeave(){
  	this.viewCtrl.dismiss();
 	}

}
