import { Component } from '@angular/core';
import { NavController, ToastController} from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.services';
import { LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(private authService: AuthService,
			private LoadingCtrl: LoadingController,
			private alertCtrl: AlertController,
			private toast: ToastController,
			public navCtrl: NavController,
			private storage: Storage) {}

  onLoadRegister(){
		this.navCtrl.push(RegisterPage);
}

	onLogin(form: NgForm){
		const loading = this.LoadingCtrl.create({ //for spinner
			content: 'Signing You In...'          // message on spinner
		});
		loading.present(); //to display loader
		this.authService.signIn(form.value.email,form.value.password)
		.then(data => {		
		loading.dismiss();
		const toast = this.toast.create({
  		message: "You have successfully logged in.", 
  		duration: 2000,
  		position: 'bottom'
  		});
  		toast.present();
		})
		.catch(error => {
				loading.dismiss();
				const alert = this.alertCtrl.create({
					title: 'Sign In Failed!',
					message: error.message,
					buttons: ['OK']
				});
				alert.present(); // to load or show error message
		});
	}

}