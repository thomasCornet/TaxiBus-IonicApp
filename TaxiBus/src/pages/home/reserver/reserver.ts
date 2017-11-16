import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
@Component({
    selector: 'page-reserver',
    templateUrl: 'reserver.html'
  })
  
  export class ReserverPage {
    constructor(public navCtrl: NavController) {
      
    }
    showHome(){
      this.navCtrl.pop(); 
    }
    
  }
  