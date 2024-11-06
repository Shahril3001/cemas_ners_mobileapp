import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.services';
import { LoadingController,NavController, ToastController, AlertController } from 'ionic-angular';  
import { ProfileService } from '../../services/profile.service';
import { LoginPage } from '../../pages/login/login';
import { SMS } from '@ionic-native/sms';
import { AndroidPermissions } from '@ionic-native/android-permissions';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  message:any;
  constructor( 
  	private authService: AuthService, 
  	public navCtrl: NavController, 
	private LoadingCtrl: LoadingController,
	private alertCtrl: AlertController,
	private toast: ToastController,
	private androidPermissions: AndroidPermissions,
	public sms: SMS,
	public profileService:ProfileService
	) {
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

 	onRegister(form: NgForm){ //function for signup (relate with service)
		
		const loading = this.LoadingCtrl.create({ //for spinner
			content: 'Signing you Up...'          // message on spinner
		});
		loading.present(); //to display loader
  	
		this.authService.signUp(form.value.email, form.value.password)
			.then(data => {
			loading.dismiss();
			this.message = 
			"Hello " + form.value.name +". Welcome to CEMAS!\n"+
			"You have successfully registered on the application.\n\n"+
			"These are your registered credentials.\n"+
			"Your email: "+form.value.email.toLowerCase()+".\n"+
			"Your password: "+form.value.password+"."
			;
    		this.sms.send(form.value.phone, this.message)
			this.profileService.addProfile(
			"No data",
			"No data",
			"No data",
			"No data",
			form.value.email.toLowerCase(),
			"No data",
			"No data",
			"No data",
       		form.value.name,
       		"No data",
       		"No data",
        	form.value.password, 
        	form.value.phone, 
        	"No data",
        	"https://i.ibb.co/Y8yfS9V/noimage.png"
       		); 
			this.navCtrl.setRoot(LoginPage);
			  const toast = this.toast.create({
		      message: "New account has been successfully created", 
		      duration: 2000,
		      position: 'bottom'
		      });
		      toast.present();
			})
			.catch(error => {
				loading.dismiss();
				const alert = this.alertCtrl.create({
					title: 'Signup Failed!',
					message: error.message,
					buttons: ['OK']
				});
				alert.present(); // to load or show error message
			});
	}

}