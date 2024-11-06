import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';

import { Brightness } from '@ionic-native/brightness';
import { NativeAudio } from '@ionic-native/native-audio';
import { AgmCoreModule } from '@agm/core';   // after install npm agm core import heres
import { Geolocation } from '@ionic-native/geolocation'; // import geolocation
import { CallNumber } from '@ionic-native/call-number';
import { Contacts } from '@ionic-native/contacts';
import { Insomnia } from '@ionic-native/insomnia';
import { SMS } from '@ionic-native/sms';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NativeGeocoder} from '@ionic-native/native-geocoder';

import {MyApp} from './app.component';
import {AlertPage} from '../pages/alert/alert';
import { IcontactPage } from '../pages/icontact/icontact';
import { LcontactPage } from '../pages/lcontact/lcontact';
import { NcontactPage } from '../pages/ncontact/ncontact';

import {HotlinesPage} from '../pages/hotlines/hotlines';
import {MapPage} from '../pages/map/map';
import {SettingsPage} from '../pages/settings/settings';
import {TabsPage} from '../pages/tabs/tabs';
import {Tabs1Page} from '../pages/tabs1/tabs1';
import {ViewalertPage} from '../pages/viewalert/viewalert';
import {QrcodePage} from '../pages/qrcode/qrcode';
import {ScanqrcodePage} from '../pages/scanqrcode/scanqrcode';
import {MyprofilePage} from '../pages/myprofile/myprofile';
import {EditprofilePage} from '../pages/editprofile/editprofile';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';

import {SettingsProvider} from '../providers/settings/settings';
import {AuthService} from '../services/auth.services';
import {ProfileService} from '../services/profile.service';
import {ImportcontactService} from '../services/icontact.services';
import {HotlineService} from '../services/hotline.service';
import {EmergencyService} from '../services/emergencyaction.services';
import {ContactService} from '../services/contact.service';
import {PincontactService} from '../services/pcontact.services';
import {EmergencycontactService} from '../services/emergencycontact.services';
import {NightmodeService} from '../services/nightmode.service';
import {AwakemodeService} from '../services/awakemode.service';
import {BlindmodeService} from '../services/blindmode.service';
import {BrightnessService} from '../services/brightness.service';

import { SearchPipe } from '../pipes/search/search';
import { SortPipe } from '../pipes/sort/sort';

import{IonicStorageModule}from '@ionic/storage';
const firebaseConfig={
    apiKey: "AIzaSyDV0jxSu_BYBSpAP23aiWKdCgg9VUbGKI0",
    authDomain: "cemasadminpwa.firebaseapp.com",
    databaseURL: "https://cemasadminpwa.firebaseio.com",
    projectId: "cemasadminpwa",
    storageBucket: "",
    messagingSenderId: "1083082980215",
    appId: "1:1083082980215:web:14a4fdd9c12216ff"
};

@NgModule({
  declarations: [
    MyApp,
    AlertPage,
    IcontactPage,
    LcontactPage,
    NcontactPage,
    HotlinesPage,
    MapPage,
    SettingsPage,
    TabsPage,
    Tabs1Page,
    QrcodePage,
    MyprofilePage,
    EditprofilePage,
    LoginPage,
    RegisterPage,
    ScanqrcodePage,
    ViewalertPage,
    SearchPipe,
    SortPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxQRCodeModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBGmFaHP1_4WN8U7sm94tzDZTjYId611o0'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AlertPage,
    IcontactPage,
    LcontactPage,
    NcontactPage,
    HotlinesPage,
    MapPage,
    SettingsPage,
    TabsPage,
    Tabs1Page,
    QrcodePage,
    MyprofilePage,
    EditprofilePage,
    LoginPage,
    RegisterPage,
    ScanqrcodePage,
    ViewalertPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Brightness,
    CallNumber,
    SMS,
    AndroidPermissions,
    Insomnia,
    NativeAudio,
    Contacts,
    SettingsProvider,
    AuthService,
    ImportcontactService,
    ProfileService,
    HotlineService,
    EmergencyService,
    ContactService,
    PincontactService,
    EmergencycontactService,
    NightmodeService,
    AwakemodeService,
    BlindmodeService,
    BrightnessService,
    BarcodeScanner,
    NativeGeocoder,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
