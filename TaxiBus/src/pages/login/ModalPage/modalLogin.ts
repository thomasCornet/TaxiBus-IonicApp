import { Component } from '@angular/core';
import {  NavParams ,NavController,ViewController} from 'ionic-angular';

@Component({
    selector: 'page-modal-login',
    templateUrl: 'modalLogin.html'
  })
  export class ModalPageLogin {
      private titre;
      private numChoix;
    constructor(public params: NavParams,public viewCtrl: ViewController,public navCtrl: NavController){

        
        var choix=[
            {titre:"Nouveau mot de passe"},
            {titre:"Inscription"}];

    
            this.titre=choix[this.params.get('titre').choix];
           this.numChoix=this.params.get('titre').choix;
          
    
    }
    dismiss() {
        this.viewCtrl.dismiss();
      }
  }