
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfilPage } from '../profil';
@Component({
    selector: 'page-modifier',
    templateUrl: 'modifier.html'
  })
  
  export class ModifierPage {
    constructor(public navCtrl: NavController) {
      
    }
    showValider(){
      this.navCtrl.pop();
    }
    
  }
  