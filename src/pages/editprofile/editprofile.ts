import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import {Profile} from '../../models/profile.model';
import { ProfileService } from '../../services/profile.service';
import { MyprofilePage } from '../myprofile/myprofile';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage{

  constructor(
  	private authService: AuthService,
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	private toast: ToastController,
  	private formbuilder: FormBuilder,
  	public profileService:ProfileService
  	) {}
   	editProfileForm: FormGroup;
	profiles:Profile;
	profileKey: string;

	bloodgroup = ['A', 'B', 'AB', 'O']; 
	gendertype = ['Male','Female']; 
	martial = ['Single','Married','Divorced','Widowed']; 
	racetype = ['Belait','Bisaya','Brunei','Chinese','Dusun','Indian','Kedayan','Murut','Tutong','Other']; 
	
	ngOnInit(){
		this.profiles = this.navParams.get("profiles");
		this.profileKey = this.navParams.get('key');
		this.initializeForm();
	}

	initializeForm() {
		let address = this.profiles.address;
		let bloodgroup = this.profiles.bloodgroup;
		let bruhims_no = this.profiles.bruhims_no;
		let dateofbirth = this.profiles.dateofbirth;
		let email = this.profiles.email;
		let gender = this.profiles.gender;
		let icnumber = this.profiles.icnumber;
		let marriage_status = this.profiles.marriage_status;
		let name = this.profiles.name;
		let nationality = this.profiles.nationality;
		let occupation = this.profiles.occupation;
		let password = this.profiles.password;
		let phone = this.profiles.phone;
		let race = this.profiles.race;
		let photo_urls = this.profiles.race;

		this.editProfileForm = new FormGroup({
			'address': new FormControl(null, [Validators.required, Validators.maxLength(100)]),
			'bloodgroup': new FormControl(null, Validators.required),
			'bruhims_no': new FormControl(null, [Validators.required, Validators.maxLength(15)]),
			'dateofbirth': new FormControl(null, Validators.required),
			'email': new FormControl(null, [Validators.required, Validators.maxLength(50)]),
			'gender': new FormControl(null, Validators.required),
			'icnumber': new FormControl(null, [Validators.required, Validators.maxLength(8)]),
			'marriage_status': new FormControl(null, [Validators.required]),
			'name': new FormControl(null, [Validators.required, Validators.maxLength(100),Validators.pattern('[a-zA-Z ]*')]),
			'nationality': new FormControl(null, [Validators.required, Validators.maxLength(50)]),
			'occupation': new FormControl(null, [Validators.required, Validators.maxLength(25),Validators.pattern('[a-zA-Z ]*')]),
			'password': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(15),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]),
			'phone': new FormControl(null, [Validators.required, Validators.minLength(7), Validators.maxLength(7),Validators.pattern('^[0-9]+$')]),
			'race': new FormControl(null, [Validators.required]),
			'photo_urls': new FormControl(null, [Validators.required, Validators.maxLength(200)])
		});
	}
	
	onSubmit(){
			this.authService.reauthenticate(this.profiles.password);
			this.authService.changePassword(this.profiles.password,this.editProfileForm.get('password').value);
			this.profileService.editProfile(this.profileKey, 
				this.editProfileForm.get('address').value,	
				this.editProfileForm.get('bloodgroup').value, 
				this.editProfileForm.get('bruhims_no').value,
				this.editProfileForm.get('dateofbirth').value,
				this.editProfileForm.get('email').value,
				this.editProfileForm.get('gender').value,
				this.editProfileForm.get('icnumber').value,
				this.editProfileForm.get('marriage_status').value,
				this.editProfileForm.get('name').value,
				this.editProfileForm.get('nationality').value,
				this.editProfileForm.get('occupation').value,
				this.editProfileForm.get('password').value,
				this.editProfileForm.get('phone').value,
				this.editProfileForm.get('race').value,
				this.editProfileForm.get('photo_urls').value,
			). then(() => {
				 this.editProfileForm.reset();
				 this.navCtrl.setRoot(MyprofilePage);
				
			});
				  const toast = this.toast.create({
			      message: "Your profile is up-to-date.", 
			      duration: 2000,
			      position: 'bottom'
			      });
			      toast.present();
		} 
}
