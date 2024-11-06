import { Component} from '@angular/core';
import { NavController, NavParams,Platform, LoadingController, ToastController } from 'ionic-angular';
import { Location } from '../../models/location.model';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeAudio } from '@ionic-native/native-audio';
import { Importcontact } from '../../models/icontact.model';
import {ImportcontactService} from '../../services/icontact.services';
import { SMS } from '@ionic-native/sms';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { NativeGeocoder,NativeGeocoderOptions,NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage{



  constructor(public navParams: NavParams,        
          private geoLocation: Geolocation,
          private loadCtrl: LoadingController,
          private toast: ToastController,
          private navCtrl:NavController,
          public sms: SMS,
          private androidPermissions: AndroidPermissions,
          private importcontactService: ImportcontactService,
          public platform: Platform, 
          private storage: Storage,
          private nativeAudio: NativeAudio,
          private nativeGeocoder: NativeGeocoder
          ) {
          this.marker = this.location;

        this.geoLocation.getCurrentPosition().then(
        location => {
        this.location.lat = location.coords.latitude;
        this.location.lng = location.coords.longitude;
        this.getGeoencoder( this.location.lat,this.location.lng)
        this.marker = new Location(this.location.lat, this.location.lng);
        this.googleurl ="https://www.google.com/maps/search/?api=1&query="+this.location.lat+","+this.location.lng+"&";
        this.locationIsSet = true;
        const toast = this.toast.create({
        message: "Real time location is detected.", 
        duration: 2000,
        position: 'bottom'
        });
        toast.present();
     })
        this.platform.ready().then(() => {
      this.nativeAudio.preloadSimple('uniqueId1', 'assets/sound/emergency.mp3').then((success)=>{
        console.log("success");
      },(error)=>{
        console.log(error);
      });
    });
  }

  message:any;
  importcontact: Importcontact[]; 
  isPLAY = true;
  location: Location = { lat: 4.906883,lng: 114.916486 };
  marker: Location;  
  locationIsSet = false;
  localData:string;
  geoAddress: string;
  googleurl:string;
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  checkPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
      success => {
        //if permission granted
      },
      err => {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS).
          then(success => {
          },
            err => {
              console.log("cancelled")
            });
      });
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);
  }

  play(){
    this.isPLAY = false;
    this.nativeAudio.loop('uniqueId1');
    this.nativeAudio.setVolumeForComplexAsset('uniqueId1', 1.0).then((success)=>{
      console.log("success playing");
    },(error)=>{
      console.log(error);
    });
  }

  stop(){
    this.isPLAY = true;
    this.nativeAudio.stop('uniqueId1').then((success)=>{
      console.log("success playing");
    },(error)=>{
      console.log(error);
    });
  }


  onLocate(){
    const loading = this.loadCtrl.create({
      content: 'Getting your location...'
    });
    loading.present();
    this.geoLocation.getCurrentPosition()
    .then(
      location => {
        loading.dismiss();
        this.location.lat = location.coords.latitude;
        this.location.lng = location.coords.longitude;
        this.getGeoencoder( this.location.lat,this.location.lng)
        this.marker = new Location(this.location.lat, this.location.lng);
        this.googleurl ="https://www.google.com/maps/search/?api=1&query="+this.location.lat+","+this.location.lng+"&";
        this.locationIsSet = true;
        const toast = this.toast.create({
        message: "Current location is  detected.", 
        duration: 2000,
        position: 'bottom'
        });
        toast.present();
      }
      )
      .catch(  // to display errors
        error => {
          loading.dismiss();
          const toast = this.toast.create({
            message: 'Could not get location, please select manually!',
            duration: 2500
          })
            toast.present();
          console.log(error);
        }
        );
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

  onSetMarker(event: any){ 
  	this.marker = new Location(event.coords.lat, event.coords.lng);
    this.locationIsSet = true;
  }


  smsContact(){
      this.storage.get('ImportContact').then((data) => {
         if(data){
         this.importcontact = JSON.parse(data);
          Object.keys(this.importcontact).forEach(key => {
          this.importcontactService.updateContact(key,this.importcontact[key].displayName, this.importcontact[key].phoneNumbers);
        });
          }else{
          this.localData="No data found.";
        }
      });

      if(this.importcontact.length == 0){
       let toast = this.toast.create({
        message: 'There are no emergency contacts.',
        duration: 2000        });
        toast.present();
      }
      else{
          for (let i = 0; i < this.importcontact.length; i++) {
          this.message = "EMERGENCY TEXT MESSAGE HELP ME!\n\n"+
          "I am at "+ this.geoAddress +".\n"+
          "Here is the Google Map link: "+ this.googleurl;
          this.sms.send(this.importcontact[i].phoneNumbers[0].value, this.message)
            .then(()=>{
              let toast = this.toast.create({
                message: 'Message sent successfully',
                duration: 2000        });
              toast.present();
            },()=>{
              let toast = this.toast.create({
                message: 'Failure',
                duration: 2000        });
              toast.present();
            });
          this.locationIsSet = false;
        }
      }

  }
}
