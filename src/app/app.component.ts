import { Component, ViewChild} from '@angular/core';
import { Platform, MenuController, NavController,ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TabsPage} from '../pages/tabs/tabs';
import {Tabs1Page} from '../pages/tabs1/tabs1';
import { MapPage } from '../pages/map/map';
import { MyprofilePage } from '../pages/myprofile/myprofile';
import { SettingsProvider } from './../providers/settings/settings';
import { SettingsPage } from '../pages/settings/settings';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { QrcodePage } from '../pages/qrcode/qrcode'
import { ScanqrcodePage } from '../pages/scanqrcode/scanqrcode';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


import { AuthService } from '../services/auth.services';

import { timer } from 'rxjs/observable/timer';
import firebase from 'firebase';

import { Injectable } from '@angular/core';

@Injectable()
@Component({
  templateUrl: 'app.html'
})
export class MyApp{
  showSplash = true;
  rootPage:any = TabsPage;
  root1Page:any = Tabs1Page;
  mapPage: any = MapPage;
  qrcodePage: any = QrcodePage;
  scanqrcodePage: any = ScanqrcodePage;
  myprofilePage: any = MyprofilePage;
  settingsPage: any = SettingsPage;
  loginPage: any = LoginPage;
  scannedCode = null;
  isAuthenticated = false;
  selectedTheme: String;
  senderuser:any;

  @ViewChild('nav') nav: NavController;
  
  constructor(
    public platform: Platform,
    statusBar: StatusBar, 
    private menuCtrl : MenuController,
    private settings: SettingsProvider,
    private authService: AuthService,
    private barcodeScanner: BarcodeScanner,
    private toast: ToastController,
    splashScreen: SplashScreen) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);

    firebase.initializeApp({
      apiKey: "AIzaSyDV0jxSu_BYBSpAP23aiWKdCgg9VUbGKI0",
      authDomain: "cemasadminpwa.firebaseapp.com",
      databaseURL: "https://cemasadminpwa.firebaseio.com",
      projectId: "cemasadminpwa",
      storageBucket: "",
      messagingSenderId: "1083082980215"
    });
    
    platform.ready().then(() => {


    firebase.auth().onAuthStateChanged(user => {
      if (user){
          this.isAuthenticated = true;
          this.authService.getActiveUser();
          this.nav.setRoot(this.rootPage);
      }
      else {
        this.isAuthenticated = false;
        this.nav.setRoot(this.root1Page);
      }
    }); 


      statusBar.styleDefault();
      splashScreen.hide();
         timer(3000).subscribe(() => this.showSplash = false)
    });
  }

  get hsender() {
    const globaluser: any = this.authService.checkActiveUser();
    if (!globaluser) {
      return this.senderuser="unknown sender";

    }
      return globaluser.email; 
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
    this.scannedCode = barcodeData.text;
    if(!this.scannedCode){
       if(this.hsender=="unknown sender"){
        this.menuCtrl.close();
        this.nav.setRoot(this.root1Page);
       }else{
        this.menuCtrl.close();
        this.nav.setRoot(this.rootPage);
       }
     
    }else{
      this.nav.push(ScanqrcodePage,{ scannedCode:this.scannedCode });
      this.menuCtrl.close();
    }
    }, (err) => {
        console.log('Error: ', err);
        const toast = this.toast.create({
        message: "Failure.", 
        duration: 2000,
        position: 'bottom'
        });
        toast.present();
    });
  }

  onLoad(page: any){
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

    onLogout(){
    this.authService.logout();
    this.menuCtrl.close();
  }


    onExit(){
    this.menuCtrl.close();
    this.platform.exitApp();
  }
}

