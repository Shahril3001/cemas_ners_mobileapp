import { Component, OnInit} from '@angular/core';
import { NavController, NavParams,ToastController} from 'ionic-angular';

import { Injectable } from '@angular/core';
import {Profile} from '../../models/profile.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { CallNumber } from '@ionic-native/call-number';
import { EmergencycontactService } from '../../services/emergencycontact.services';
import {EmergencyContact} from '../../models/emergencycontact.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-scanqrcode',
  templateUrl: 'scanqrcode.html',
})
export class ScanqrcodePage implements OnInit{
  private opt: string = 'bruhims';
  profilelist:Observable<Profile[]>;
  emercontactlist:Observable<EmergencyContact[]>;
  scannedCode = null;
  constructor(
    private db: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    public callNumber: CallNumber,
    private toast: ToastController,
    ) {}

  ngOnInit(){
    this.scannedCode = this.navParams.get("scannedCode");
    let profiledata = this.db.list<Profile>('profile' ,ref =>  ref.orderByChild('email').equalTo( this.scannedCode));
    let profiledata1 = this.db.list<EmergencyContact>('EmergencyContact' ,ref =>  ref.orderByChild('email').equalTo( this.scannedCode));
    profiledata.valueChanges().first().subscribe(res => {
    if(res.length < 1){
      const toast = this.toast.create({
      message: "Sorry. No data is found.", 
      duration: 2000,
      position: 'bottom'
      });
      toast.present();
    }
    else{
      const toast = this.toast.create({
      message: "Data was found.", 
      duration: 2000,
      position: 'bottom'
      });
      toast.present();
      this.profilelist = profiledata.snapshotChanges().map(changes => {
      return changes.map(c => ({
      key: c.payload.key,
      ...c.payload.val()
      }));
      });
    }
    });

    if(!profiledata1){

    }else{
      this.emercontactlist = profiledata1.snapshotChanges().map(changes => {
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val()
        }));
      });
    }
  }

  callContact(number: string) {
    this.callNumber.callNumber(number, true)
      .then(() => console.log('Dialer Launched!'))
      .catch(() => console.log('Error launching dialer'));
  }
}
