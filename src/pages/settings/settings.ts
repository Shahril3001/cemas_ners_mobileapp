import { SettingsProvider } from './../../providers/settings/settings';
import { Component,OnInit} from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Brightness } from '@ionic-native/brightness';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Platform } from 'ionic-angular';
import { Insomnia } from '@ionic-native/insomnia';
import {NightmodeService} from '../../services/nightmode.service';
import { Nightmode } from '../../models/nightmod.model';

import {AwakemodeService} from '../../services/awakemode.service';
import { ScreenAwake } from '../../models/awakemod.model';

import {BlindmodeService} from '../../services/blindmode.service';
import { Blindmode } from '../../models/blindmod.model';

import {BrightnessService} from '../../services/brightness.service';
import {Brightnessmodel} from '../../models/brightnessmod.model';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})
export class SettingsPage implements OnInit{

  private blindmode: boolean = false;
  private nightmode: boolean = false;
  private awakestatus:boolean = false;

  brightnessModel:number;
  isToggled: boolean = false;
  nightmodelist: Nightmode[]; 
  screenAwakelist: ScreenAwake[]; 
  blindmodelist: Blindmode[]; 
  brightnesslist: Brightnessmodel[]; 
  localData:string;
  constructor(
    public navCtrl: NavController, 
    private settings: SettingsProvider,
    public platform: Platform,
    private brightness: Brightness,
    private toast: ToastController,
    private nightmodeService: NightmodeService,
    private awakemodeService: AwakemodeService,
    private blindmodeService: BlindmodeService,
    private brightnessService: BrightnessService,
    private storage: Storage,
    private insomnia: Insomnia
    ){
   this.brightness.setBrightness((this.brightnessModel/100));
  }

  ngOnInit(){
       this.storage.get('Nightmode').then((data) => {
       if(data){
       this.nightmodelist = JSON.parse(data);
        Object.keys(this.nightmodelist).forEach(key => {
        this.nightmodeService.updateNightmode(key,this.nightmodelist[key].nightstatus);
        if(this.nightmodelist[0].nightstatus == "true"){
          this.settings.setActiveTheme('light-theme');
        }else{
          this.settings.setActiveTheme('dark-theme');
        }
      });
        }else{
        if(!this.nightmodelist){
          this.nightmodeService.addNightmode("false");
          this.nightmodelist = this.nightmodeService.getNightmode();
          this.storage.set('Nightmode', JSON.stringify(this.nightmodelist));
          this.settings.setActiveTheme('dark-theme');
        }
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
        if(!this.screenAwakelist){
        this.awakemodeService.addAwakemode("false");
        this.screenAwakelist = this.awakemodeService.getAwakemode();
        this.storage.set('Awakemode', JSON.stringify(this.screenAwakelist));
        this.insomnia.allowSleepAgain()
      }
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
        if(!this.blindmodelist){
        this.blindmodeService.addBlindmode("false");
        this.blindmodelist = this.blindmodeService.getBlindmode();
        this.storage.set('Awakemode', JSON.stringify(this.blindmodelist));
        this.settings.setActiveTheme('dark-theme');
      }
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
        if(!this.brightnesslist){
        this.brightnessService.addBrightness(0);
        this.brightnesslist = this.brightnessService.getBrightness();
        this.storage.set('Brightnessdata', JSON.stringify(this.brightnesslist));
      }
      }
    });  
  }

 
    toggleAppTheme() {
    if (!this.nightmode) {
      this.nightmode = true;
      this.nightmodeService.updateNightmode(0,"true"); 
      this.nightmodelist = this.nightmodeService.getNightmode()
      this.storage.set('Nightmode', JSON.stringify(this.nightmodelist));
      this.blindmodeService.updateBlindmode(0,"false"); 
      this.blindmodelist = this.blindmodeService.getBlindmode()
      this.storage.set('Colorblindmode', JSON.stringify(this.blindmodelist));
      this.settings.setActiveTheme('light-theme');
      const toast = this.toast.create({
      message: "Night mode activated.", 
      duration: 2000,
      position: 'bottom'
      });
      toast.present();
    } else {
      this.nightmode = false;
      this.nightmodeService.updateNightmode(0, "false"); 
      this.nightmodelist = this.nightmodeService.getNightmode()
      this.storage.set('Nightmode', JSON.stringify(this.nightmodelist));
      this.blindmodeService.updateBlindmode(0,"false"); 
      this.blindmodelist = this.blindmodeService.getBlindmode()
      this.storage.set('Colorblindmode', JSON.stringify(this.blindmodelist));
      this.settings.setActiveTheme('dark-theme');
      const toast = this.toast.create({
      message: "Night mode deactivated.", 
      duration: 2000,
      position: 'bottom'
      });
      toast.present();
    }
  }

  toggleAwake() {
    if(!this.awakestatus){
      this.awakestatus = true;
      this.awakemodeService.updateAwakemode(0,"true"); 
      this.screenAwakelist = this.awakemodeService.getAwakemode()
      this.storage.set('Awakemode', JSON.stringify(this.screenAwakelist));
      this.insomnia.keepAwake()
      const toast = this.toast.create({
      message: "Device is keep awake.", 
      duration: 2000,
      position: 'bottom'
      });
      toast.present();
      }
      else{
      this.awakestatus = false;
      this.awakemodeService.updateAwakemode(0,"false"); 
      this.screenAwakelist = this.awakemodeService.getAwakemode()
      this.storage.set('Awakemode', JSON.stringify(this.screenAwakelist));
      this.insomnia.allowSleepAgain()
      const toast = this.toast.create({
      message: "Device is allow sleep.", 
      duration: 2000,
      position: 'bottom'
      });
      toast.present();
     }
  }

  toggleBlind() {
    if (!this.blindmode) {
      this.blindmode = true;
      this.blindmodeService.updateBlindmode(0,"true"); 
      this.blindmodelist = this.blindmodeService.getBlindmode()
      this.storage.set('Colorblindmode', JSON.stringify(this.blindmodelist));
      this.nightmodeService.updateNightmode(0,"false"); 
      this.nightmodelist = this.nightmodeService.getNightmode()
      this.storage.set('Nightmode', JSON.stringify(this.nightmodelist));
      this.settings.setActiveTheme('blind-theme');
      const toast = this.toast.create({
      message: "Color blind mode activated.", 
      duration: 2000,
      position: 'bottom'
      });
      toast.present();
    } else {
      this.blindmode = false;
      this.blindmodeService.updateBlindmode(0,"false"); 
      this.blindmodelist = this.blindmodeService.getBlindmode()
      this.storage.set('Colorblindmode', JSON.stringify(this.blindmodelist));
      this.nightmodeService.updateNightmode(0,"false"); 
      this.nightmodelist = this.nightmodeService.getNightmode()
      this.storage.set('Nightmode', JSON.stringify(this.nightmodelist));
      this.settings.setActiveTheme('dark-theme');
      const toast = this.toast.create({
      message: "Color blind mode deactivated.", 
      duration: 2000,
      position: 'bottom'
      });
      toast.present();
    }
  }


   adjustBrightness(){
    this.brightness.setBrightness((this.brightnessModel/100));
    this.brightnessService.updateBrightness(0, this.brightnessModel); 
    this.brightnesslist = this.brightnessService.getBrightness()
    this.storage.set('Brightnessdata', JSON.stringify(this.brightnesslist));
  }

}