import { Component } from '@angular/core';
import {NavParams , NavController,ViewController} from 'ionic-angular';
import {ProfilPage} from '../../profil/profil';

@Component({
    selector: 'page-modal-picture',
    templateUrl: 'modal-picture.html'
  })
export class PicturePage {
    private numChoix;
    private choix;
    private images=['boy.png','girl.png','man.png','woman.png'];
    
    constructor(public params: NavParams,public viewCtrl: ViewController,public navCtrl: NavController) {
        var choix=[
            {name:"Avatar"},
            {name:"Galerie"}
           ];
        this.choix=choix[this.params.get('choixNum').choixNum]; 
        this.numChoix=this.params.get('choixNum').choixNum;
    }
    dismiss() {
        this.viewCtrl.dismiss();
      }
    choixImage(image){
        this.navCtrl.push(ProfilPage,{image:image});
    }
  }