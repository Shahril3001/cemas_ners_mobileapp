import { Component,OnInit} from '@angular/core';
import { NavController, Platform, AlertController,ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Pincontact } from '../../models/pcontact.model';
import {PincontactService} from '../../services/pcontact.services';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import { Location } from '../../models/location.model';
import { Geolocation } from '@ionic-native/geolocation';
import { HotlineService } from '../../services/hotline.service';
import { Hotlines } from '../../models/hotline.model';
import { Observable } from 'rxjs/Observable';
import {EmergencyService } from '../../services/emergencyaction.services';
import { AuthService } from '../../services/auth.services';
import { NativeAudio } from '@ionic-native/native-audio';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-hotlines',
  templateUrl: 'hotlines.html',
})
export class HotlinesPage implements OnInit{
  isPLAY = true;
  senderuser:any;
  message:any;
  location: Location = { lat: 4.906883,lng: 114.916486 };
  today: string = new Date().toLocaleDateString();
  time:any = new Date().toLocaleTimeString('en-US');
  pincontact: Pincontact[];
  localData:string;
  hotlineslist: Observable<Hotlines[]>;
  marker: Location;
  private opt: string = 'emergency';
  
  constructor(
  	public navCtrl: NavController,  
    private alertCtrl:AlertController,
    private hotlineService: HotlineService,
    public callNumber: CallNumber,
    public sms: SMS,
    private geoLocation: Geolocation,
    public emergencyService:EmergencyService,
    private pincontactService: PincontactService,
    private storage: Storage,
    private toast: ToastController,
    private authService: AuthService,
    public platform: Platform, 
    private nativeAudio: NativeAudio,
    private androidPermissions: AndroidPermissions,
    ) {
      this.marker = this.location;
      this.geoLocation.getCurrentPosition().then(
      location => {
        this.location.lat = location.coords.latitude;
        this.location.lng = location.coords.longitude;
        this.marker = new Location(this.location.lat, this.location.lng);
        const toast = this.toast.create({
        message: "Real time location is detected.", 
        duration: 2000,
        position: 'bottom'
        });
        toast.present();
     })

      this.platform.ready().then(() => {
      this.nativeAudio.setVolumeForComplexAsset('uniqueId1',1);
      this.nativeAudio.preloadComplex('uniqueId1', 'assets/sound/emergency.mp3', 1, 1, 0).then((success)=>{
      this.nativeAudio.setVolumeForComplexAsset('uniqueId1',1);
        console.log("success");
      },(error)=>{
        console.log(error);
      });
    });
  }

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
    this.nativeAudio.loop('uniqueId1').then((success)=>{
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

   get hsender() {
    const globaluser: any = this.authService.checkActiveUser();
    if (!globaluser) {
      return this.senderuser="unknown sender";

    }
      return globaluser.email; 
  }

  ngOnInit(){
    this.hotlineslist = this.hotlineService.getHotline().snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.payload.key,
        ...c.payload.val()
      }));
    });
  }

  callContact(contact:any, number: string) {
      const toast = this.toast.create({
      message: "You are calling " + contact.name +".", 
      duration: 2000,
      position: 'bottom'
      });
      toast.present();
      console.log(number);
      this.callNumber.callNumber(number, true)
      .then(() => console.log('Dialer Launched!'))
      .catch(() => console.log('Error launching dialer'));
      this.emergencyService.addEmergency(
      this.hsender,
      contact.name,
      this.today +" "+ this.time, 
      this.location
      ); 
    }

  callContact1(number: string) {
    console.log(number);
    this.callNumber.callNumber(number, true)
      .then(() => console.log('Dialer Launched!'))
      .catch(() => console.log('Error launching dialer'));
  }

  smsContact(number: string){
    this.message =  "EMERGENCY TEXT MESSAGE PLEASE HELP ME!\n"+
    "ASAP! Help me immediately.";
    this.sms.send(number, this.message)
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
  }

  onUnpin(index: number){
    const toast = this.toast.create({
      message: this.pincontact[index].displayName + " has been removed from Favourite Contact.", 
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
    this.pincontactService.removePincontact(index);
    this.pincontact = this.pincontactService.getPincontact();
    this.storage.set('PinContact', JSON.stringify(this.pincontact));
  }


  ionViewWillEnter(){
      this.storage.get('PinContact').then((data) => {
      if(data){
      this.pincontact = JSON.parse(data);
      Object.keys(this.pincontact).forEach(key => {
      this.pincontactService.updatePincontact(key,this.pincontact[key].displayName, this.pincontact[key].phoneNumbers);
      });
        }else{
        this.localData="No data found.";
      }
    });
  }
}
