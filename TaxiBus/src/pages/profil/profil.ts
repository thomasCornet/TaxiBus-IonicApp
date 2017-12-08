import { Component } from '@angular/core';
import { NavParams,NavController} from 'ionic-angular';
import {ModifierPage} from "./modifier/modifier";
import {UserApiService} from '../../services/userapi.service';
import {UserApiGlobal} from '../../models/userapi.global';
import {ModalPage} from '../profil/ModalPage/modal';

@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html'
})
export class ProfilPage {

  user: UserApiGlobal = new UserApiGlobal();
  info:string;
  image;

  constructor(public params: NavParams,public navCtrl: NavController, private userApiService : UserApiService) {
    
    
     this.userApiService.getUser()
     .then(userFetched => {
       this.user=userFetched 
        console.log(this.user);
        // affiche direct la secion Information
        this.info="reservation";
     });

     if(!(this.image=this.params.get('image'))){
       this.image="user.png"
     }
     else{
      this.image=this.image=this.params.get('image');
     }
   
  }
  showModifier(){
    this.navCtrl.push(ModifierPage);
  }

  openModal(choixNum) {
     this.navCtrl.push(ModalPage,{choixNum:choixNum});
      }

  aPropos(){
    this.navCtrl.push(ModalPage,{choixNum:4});
  }

  imgChange(){
    this.navCtrl.push(ModalPage,{choixNum:5});
  }
}
