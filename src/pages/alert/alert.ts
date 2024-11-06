import { Component,OnInit} from '@angular/core';
import { NavController, Platform, ModalController} from 'ionic-angular';
import { ViewalertPage } from '../viewalert/viewalert';
import { EmergencyService } from '../../services/emergencyaction.services';
import { Emergencycall } from '../../models/emergencycall.model';
import { Observable } from 'rxjs/Observable';
import { NativeAudio } from '@ionic-native/native-audio';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-alert',
  templateUrl: 'alert.html',
})
export class AlertPage implements OnInit{

  constructor(
    public navCtrl: NavController, 
    private emergencyService: EmergencyService,   
    private modalCtrl: ModalController,
    public platform: Platform, 
    private nativeAudio: NativeAudio
    ) 
  {
      this.platform.ready().then(() => {
      this.nativeAudio.preloadSimple('uniqueId1', 'assets/sound/emergency.mp3').then((success)=>{
        console.log("success");
      },(error)=>{
        console.log(error);
      });
    });
  }
  isPLAY = true;
  emergencylist: Observable<Emergencycall[]>;

  ngOnInit(){
    this.emergencylist = this.emergencyService.getEmergency().snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.payload.key,
        ...c.payload.val()
      }));
    });
  }

  play(){
    this.isPLAY = false;
    this.nativeAudio.loop('uniqueId1');
    this.nativeAudio.setVolumeForComplexAsset('uniqueId1', 1.0).then((success)=>{
      console.log("success playing");
    },(error)=>{
      console.log(error);
    });
  }

  stop(){
    this.isPLAY = true;
    this.nativeAudio.stop('uniqueId1').then((success)=>{
      console.log("success playing");
    },(error)=>{
      console.log(error);
    });
  }

  async viewAlert(emergency:Emergencycall){
    this.navCtrl.push(ViewalertPage,{ emergency:emergency });
  }
}
