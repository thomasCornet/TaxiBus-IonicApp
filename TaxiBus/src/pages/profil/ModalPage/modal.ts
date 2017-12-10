import { Component } from '@angular/core';
import {  NavParams ,NavController,ViewController} from 'ionic-angular';
import { PicturePage} from '../ModalPicturePage/modal-picture';
import { PhotoLibrary } from '@ionic-native/photo-library';
@Component({
    selector: 'page-modal',
    templateUrl: 'modal.html'
  })
  export class ModalPage {
    private choix;
    private numChoix;
    constructor(public params: NavParams,public viewCtrl: ViewController,public navCtrl: NavController, private photoLibrary: PhotoLibrary){
        var choix=[
                   {name:"Adresse"},
                   {name:"Email"},
                   {name:"Téléphone"},
                   {name:"Mot de passe"},  
                   {name: "A propos"},
                   {name: "Photo de Profil"}
                  ];
        if(this.params.get('choixNum')!=4 && this.params.get('choixNum')!=5){
            this.choix=choix[this.params.get('choixNum').choixNum];  
            this.numChoix=this.params.get('choixNum').choixNum;
        }
        else{
            this.choix=choix[this.params.get('choixNum')];  
            this.numChoix=this.params.get('choixNum');
        }
        console.log(this.numChoix);
    }
    
    dismiss() {
        this.viewCtrl.dismiss();
      }

    openModalPicture(choixNum){
        this.navCtrl.push(PicturePage,{choixNum:choixNum});
    }
    openGallery(){
       console.log("En construction !");
    }

  }