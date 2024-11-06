import { Component} from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import { ProfileService } from '../../services/profile.service';
import { EditprofilePage } from '../editprofile/editprofile';
import {Profile} from '../../models/profile.model';
import {EmergencyContact} from '../../models/emergencycontact.model';
import { Importcontact } from '../../models/icontact.model';
import {ImportcontactService} from '../../services/icontact.services';
import {EmergencycontactService} from '../../services/emergencycontact.services';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-myprofile',
  templateUrl: 'myprofile.html',
})

export class MyprofilePage{
  	constructor(
  	public navCtrl: NavController, 
    private profileService: ProfileService,
    private toast: ToastController,
    private importcontactService: ImportcontactService,
    private emergencycontactService: EmergencycontactService,
    private storage: Storage,
  	public navParams: NavParams) {
  }
  private opt: string = 'bruhims';
  profilelist:Observable<Profile[]>;
  contactlist:Observable<EmergencyContact[]>;
  importcontact: Importcontact[]; 
  localData:string;
   

  ngOnInit(){
    this.profilelist = this.profileService.getuserprofile().snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.payload.key,
        ...c.payload.val()
      }));
    });

    this.contactlist = this.emergencycontactService.getEmercontact().snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.payload.key,
        ...c.payload.val()
      }));
    });
  }

  editProfile(profiles:Profile, key: string){
    this.navCtrl.push(EditprofilePage, {profiles: profiles, key: key});
  }

  onDeleteEmergency(key: string){
    this.emergencycontactService.deleteEmercontact(key);
    const toast = this.toast.create({
    message: "Emergency contact is deleted.", 
    duration: 2000,
    position: 'bottom'
    });
    toast.present();
    this.navCtrl.popToRoot();
  }
}
