import { Component } from '@angular/core';
import { NavController, ToastController  } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import {Newcontact} from '../../models/ncontact.model';
import{LcontactPage} from '../lcontact/lcontact';
import{ContactService} from '../../services/contact.service';


@Component({
  selector: 'page-ncontact',
  templateUrl: 'ncontact.html',
})
export class NcontactPage {

  constructor(
  	public navCtrl: NavController,
	private toast: ToastController,
  	public storage: Storage,
  	private contacts: Contacts,
    private contactService:ContactService
  	) {
  }
	newcontact: Newcontact[]; 

  addContact(form: NgForm){
  let contact: Contact = this.contacts.create();
  contact.name = new ContactName(null, '', form.value.displayName);
  let number = new ContactField('mobile', form.value.phoneNumbers);
  contact.phoneNumbers = [number];
  contact.save().then(
  () => console.log('Contact saved!', contact),
  (error: any) => console.error('Error saving contact.', error)
  );
  form.reset();  //to reset the form

  this.navCtrl.push(LcontactPage);
  const toast = this.toast.create({
     message: "New contact is added.", 
    duration: 2000,
    position: 'bottom'
    });
    toast.present();
  }
}
