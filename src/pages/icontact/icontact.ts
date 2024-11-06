import { Component} from '@angular/core';
import { NavController, Platform, AlertController, ToastController} from 'ionic-angular';
import { LcontactPage } from '../lcontact/lcontact';

import { Pincontact } from '../../models/pcontact.model';
import {PincontactService} from '../../services/pcontact.services';

import { Importcontact } from '../../models/icontact.model';
import {ImportcontactService} from '../../services/icontact.services';
import { Storage } from '@ionic/storage';
import { NativeAudio } from '@ionic-native/native-audio';

import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  selector: 'page-icontact',
  templateUrl: 'icontact.html',
})
export class IcontactPage {

  constructor(
  		public navCtrl: NavController,
      private alertCtrl: AlertController,
      private importcontactService: ImportcontactService,
      private pincontactService: PincontactService,
  		private storage: Storage,
      public callNumber: CallNumber,
      public sms: SMS,
      public platform: Platform, 
      private toast: ToastController,
      private nativeAudio: NativeAudio,
      private androidPermissions: AndroidPermissions
  	) {
    this.platform.ready().then(() => {
    this.nativeAudio.preloadSimple('uniqueId1', 'assets/sound/emergency.mp3').then((success)=>{
        console.log("success");
      },(error)=>{
        console.log(error);
      });
    });
  }

  public searchTerm: string = "";
  message:any;
  isPLAY = true;
  importcontact: Importcontact[]; 
  pincontact: Pincontact[]; 
  descending: boolean = false;
  order: number;
  displayName: string = 'displayName';
  localData:string;

  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
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


  callContact(number: string) {
    console.log(number);
    this.callNumber.callNumber(number, true)
      .then(() => console.log('Dialer Launched!'))
      .catch(() => console.log('Error launching dialer'));
  }

  smsContact(number: string){
    this.message =  "EMERGENCY TEXT MESSAGE HELP ME!\n"+
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

  importContact(){
  this.navCtrl.push(LcontactPage);
  }

	ionViewWillEnter(){
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
  }

  isPincontact(importcontact: {displayName: any, phoneNumbers: any}){
    return this.pincontactService.isPincontact(importcontact);
  }
  
  onPin(contact: {displayName,phoneNumbers}){
    const toast = this.toast.create({
    message: contact.displayName + " has been added to Favourite Contact.", 
    duration: 2000,
    position: 'bottom'
    });
    toast.present();
    this.pincontactService.addPincontact(contact.displayName,contact.phoneNumbers); 
    this.pincontact = this.pincontactService.getPincontact();
    this.storage.set('PinContact', JSON.stringify(this.pincontact));
  }

  onUnimport(index: number){
    const toast = this.toast.create({
    message: this.importcontact[index].displayName + " has been removed from Emergency Contact.", 
    duration: 2000,
    position: 'bottom'
    });
    toast.present();
    this.importcontactService.removeContact(index);
    this.importcontact = this.importcontactService.getContact();
    this.storage.set('ImportContact', JSON.stringify(this.importcontact));
    this.navCtrl.popToRoot(); 
  }
}
