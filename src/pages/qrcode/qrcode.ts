import { Component,OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage implements OnInit{
  qrData = null;
  createdCode = null;
  senderuser:string;
  constructor(
  	private barcodeScanner: BarcodeScanner, 
  	private authService: AuthService
  	) {}

   get hsender() {
    const globaluser: any = this.authService.checkActiveUser();
    if (!globaluser) {
      return this.senderuser="unknown sender";

    }
      return globaluser.email; 
  }

  ngOnInit(){
     this.createdCode = this.hsender
  }
}
