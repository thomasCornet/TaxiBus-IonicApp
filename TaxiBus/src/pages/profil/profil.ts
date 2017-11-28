import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ModifierPage} from "./modifier/modifier";
import {UserApiService} from '../../services/userapi.service';
import {UserApiGlobal} from '../../models/userapi.global';

@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html'
})
export class ProfilPage {

  user: UserApiGlobal = new UserApiGlobal();
  info:string;


  constructor(public navCtrl: NavController, private userApiService : UserApiService) {
    
     this.userApiService.getUser()
     .then(userFetched => {
       this.user=userFetched 
        console.log(this.user);

        // affiche direct la secion Information
        this.info="reservation";
     });

   
  }
  showModifier(){
    this.navCtrl.push(ModifierPage);
  }
}
