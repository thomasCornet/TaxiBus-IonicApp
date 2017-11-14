import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ModifierPage} from "./modifier/modifier";
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html'
})
export class ProfilPage {

  constructor(public navCtrl: NavController) {

  }
  showModifier(){
    this.navCtrl.push(ModifierPage);
  }
}
