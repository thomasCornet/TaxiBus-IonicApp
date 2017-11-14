
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
  