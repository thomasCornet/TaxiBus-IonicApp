import { Component } from '@angular/core';
import { NavParams,NavController} from 'ionic-angular';
import {UserApiService} from '../../services/userapi.service';
import {UserApiGlobal} from '../../models/userapi.global';
import {ModalPage} from '../profil/ModalPage/modal';
import { PlaintePage } from './Plainte/plainte';

@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html'
})
export class ProfilPage {

  private user: UserApiGlobal = new UserApiGlobal();
  private info:string;
  private image;

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
  openModal(choixNum) {
     this.navCtrl.push(ModalPage,{choixNum:choixNum});
      }

  aPropos(){
    this.navCtrl.push(ModalPage,{choixNum:4});
  }

  imgChange(){
    this.navCtrl.push(ModalPage,{choixNum:5});
  }
  plainte(){
    this.navCtrl.push(PlaintePage);
  }
}
