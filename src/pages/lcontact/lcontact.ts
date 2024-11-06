import { Component} from '@angular/core';
import { NavController, AlertController, ToastController} from 'ionic-angular';
import { Contacts} from '@ionic-native/contacts';
import { NcontactPage } from '../ncontact/ncontact';
import { IcontactPage } from '../icontact/icontact';
import { Newcontact } from '../../models/ncontact.model';

import { Importcontact } from '../../models/icontact.model';
import {EmergencyContact} from '../../models/emergencycontact.model';

import {ImportcontactService} from '../../services/icontact.services';
import {EmergencycontactService} from '../../services/emergencycontact.services';

import {ContactService} from '../../services/contact.service';
import { AuthService } from '../../services/auth.services';
import { Storage } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-lcontact',
  templateUrl: 'lcontact.html',
})
export class LcontactPage{

  contactlist:Observable<EmergencyContact[]>;
  localcontact: Promise<Newcontact[]>; 
  importcontact: Importcontact[]; 
  cloudcompare: Array<string>;
  localcompare: Array<string>;
  checked = [];
  localData:string;
  message:any;
  senderuser:any;
  cloudcontactname = [];
  totalemergencyContact:number =0;

  constructor(
    public navCtrl: NavController, 
    public callNumber: CallNumber,
    public sms: SMS,
    public contacts: Contacts,
    private alertCtrl: AlertController,
    private toast: ToastController,
    private importcontactService: ImportcontactService,
    private contactService: ContactService,
    private authService: AuthService,
    private emergencycontactService: EmergencycontactService,
    private storage: Storage,
    private db: AngularFireDatabase,
    private androidPermissions: AndroidPermissions
    ) {   
    this.localcontact = this.contacts.find(["*"]);
  }

  addCheckbox(event, checkbox:any) { 
    if ( event.checked ) {
      this.checked.push(checkbox);
    } else {
      let index = this.removeCheckedFromArray(checkbox);
      this.checked.splice(index,1);
    }
  }

   removeCheckedFromArray(checkbox:any) {
    return this.checked.findIndex((category)=>{
      return category === checkbox;
    })
  }

  get hsender() {
    const globaluser: any = this.authService.checkActiveUser();
    if (!globaluser) {
      return this.senderuser="unknown sender";

    }
      return globaluser.email; 
  }


  emptyCheckedArray() {
    this.checked = [];
  }

 getCheckedBoxes() {
      if(this.checked.length == 0){
        let toast = this.toast.create({
        message: 'There are no contacts to import.',
        duration: 2000        });
        toast.present();
      }

      if(this.hsender=="unknown sender"){
          for (let i = 0; i < this.checked.length; i++) {
          this.importcontactService.addContact(this.checked[i].displayName,this.checked[i].phoneNumbers); 
          this.importcontact = this.importcontactService.getContact();
          this.storage.set('ImportContact', JSON.stringify(this.importcontact));
          let toast = this.toast.create({
          message: 'Contacts successfully imported.',
          duration: 2000        });
          toast.present();
          this.navCtrl.setRoot(IcontactPage);
        }
      }else{
        for (let i = 0; i < this.checked.length; i++) {

          this.importcontactService.addContact(this.checked[i].displayName,this.checked[i].phoneNumbers); 
          this.importcontact = this.importcontactService.getContact();
          this.storage.set('ImportContact', JSON.stringify(this.importcontact));
         
          this.emergencycontactService.addEmercontact(this.checked[i].displayName,this.checked[i].phoneNumbers[0].value,this.hsender);
          
          let toast = this.toast.create({
          message: 'Contacts successfully imported.',
          duration: 2000
          });
          toast.present();
        }
        this.navCtrl.setRoot(IcontactPage);
      }
 }

  addnewContact(){
    this.navCtrl.push(NcontactPage);
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


  isImportContact(localcontact: {displayName: any, phoneNumbers: any}){
  return this.importcontactService.isImportContact(localcontact);
  }
}
