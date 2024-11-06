import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams, ToastController  } from 'ionic-angular';
import { EmergencycontactService } from '../../services/emergencycontact.services';
import {EmergencyContact} from '../../models/emergencycontact.model';
import { MyprofilePage } from '../myprofile/myprofile';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'page-addemercontact',
  templateUrl: 'addemercontact.html',
})
export class AddemercontactPage{

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	private toast: ToastController,
  	private authService: AuthService,
  	public emergencycontactService:EmergencycontactService
  ) {
  }

	emergencyContact: EmergencyContact;
	emercontactKey: string;
 	senderuser:any;

	get hsender() {
	    const globaluser: any = this.authService.checkActiveUser();
	    if (!globaluser) {
	      return this.senderuser="unknown sender";

	    }
	      return globaluser.email; 
	}


	onSubmit(form: NgForm){
		this.emergencycontactService.addEmercontact(
        form.value.contactname,
        form.value.contactnumber,
        this.hsender
      ); 
      form.reset();
      this.navCtrl.push(MyprofilePage);
      const toast = this.toast.create({
      message: "New Emergency Contact is added.", 
      duration: 2000,
      position: 'bottom'
      });
      toast.present();
    }
}
