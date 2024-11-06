import { Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import { HotlinesPage } from '../hotlines/hotlines';
import { MapPage } from '../map/map';
import { IcontactPage } from '../icontact/icontact';
import { AlertPage } from '../alert/alert';
import {NightmodeService} from '../../services/nightmode.service';
import { Nightmode } from '../../models/nightmod.model';
import { Storage } from '@ionic/storage';
import { SettingsProvider } from './../../providers/settings/settings';
import { Insomnia } from '@ionic-native/insomnia';
import {AwakemodeService} from '../../services/awakemode.service';
import { ScreenAwake } from '../../models/awakemod.model';
import {BlindmodeService} from '../../services/blindmode.service';
import { Blindmode } from '../../models/blindmod.model';
import { Brightness } from '@ionic-native/brightness';
import {BrightnessService} from '../../services/brightness.service';
import {Brightnessmodel} from '../../models/brightnessmod.model';
import { NativeAudio } from '@ionic-native/native-audio';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})

export class TabsPage{
  brightnessModel:number;
	hotlinesPage = HotlinesPage;
	mapPage = MapPage;
	icontactPage = IcontactPage;
	alertPage = AlertPage;
	nightmodelist: Nightmode[]; 
  screenAwakelist: ScreenAwake[];
  blindmodelist: Blindmode[]; 
  brightnesslist: Brightnessmodel[]; 

  	constructor(
    private nightmodeService: NightmodeService,
    private settings: SettingsProvider,
    private storage: Storage,
    private awakemodeService: AwakemodeService,
    private blindmodeService: BlindmodeService,
    private insomnia: Insomnia,
    private brightnessService: BrightnessService,
    private brightness: Brightness,
    private nativeAudio: NativeAudio,
    public platform: Platform
    ){
      this.platform.ready().then(() => {
      this.nativeAudio.setVolumeForComplexAsset('uniqueId1',1);
      this.nativeAudio.preloadComplex('uniqueId1', 'assets/sound/emergency.mp3', 1, 1, 0).then((success)=>{
        console.log("success");
      },(error)=>{
        console.log(error);
      });
    });
    }

	ionViewWillEnter(){
       this.storage.get('Nightmode').then((data) => {
       if(data){
       this.nightmodelist = JSON.parse(data);
        Object.keys(this.nightmodelist).forEach(key => {
        this.nightmodeService.updateNightmode(key,this.nightmodelist[key].nightstatus);
        if(this.nightmodelist[0].nightstatus == "true"){
          this.settings.setActiveTheme('light-theme');
        }
      });
        }else{
        this.settings.setActiveTheme('dark-theme');
      }
    });


       this.storage.get('Awakemode').then((data) => {
       if(data){
       this.screenAwakelist = JSON.parse(data);
        Object.keys(this.screenAwakelist).forEach(key => {
        this.awakemodeService.updateAwakemode(key,this.screenAwakelist[key].awakestatus);
        if(this.screenAwakelist[0].awakestatus == "true"){
        this.insomnia.keepAwake()
        }else{
        this.insomnia.allowSleepAgain()
        }
      });
        }else{
        this.insomnia.allowSleepAgain()
      }
    }); 

       this.storage.get('Colorblindmode').then((data) => {
       if(data){
        this.blindmodelist = JSON.parse(data);
        Object.keys(this.blindmodelist).forEach(key => {
        this.blindmodeService.updateBlindmode(key,this.blindmodelist[key].colorblindstatus);
        if(this.blindmodelist[0].colorblindstatus == "true"){
          this.settings.setActiveTheme('blind-theme');
        }
      });
        }else{
        this.settings.setActiveTheme('dark-theme');
      }
    });

       this.storage.get('Brightnessdata').then((data) => {
       if(data){
        this.brightnesslist = JSON.parse(data);
        Object.keys(this.brightnesslist).forEach(key => {
        this.brightnessService.updateBrightness(key,this.brightnesslist[key].brightnesslvl);
        this.brightnessModel = this.brightnesslist[0].brightnesslvl;
        this.brightness.setBrightness((this.brightnessModel/100));
      });
        }else{
        this.brightness.setBrightness((0/100));
      }
    });


  }
}
