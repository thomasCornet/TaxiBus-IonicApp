import { Component } from '@angular/core';
import {UserApiService} from '../../services/userapi.service';
import {HomePage} from "../home/home";
import {HorairePage} from "../horaire/horaire";
import {PrixPage} from "../prix/prix";
import {ProfilPage} from "../profil/profil";
import { Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import {UserApiMap}from '../../models/user.api.map';
@Component({
    templateUrl: 'tabs.html'
  })
  export class TabsPage {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    tab1Root = HomePage;
    tab2Root = HorairePage;
    tab3Root = PrixPage;
    tab4Root = ProfilPage;
    constructor(private userApiService : UserApiService,private nativeStorage: NativeStorage ,public platform: Platform,) {

      platform.ready().then(() =>{
        this.chargementGps();
    });
  }



  chargementGps(){
  
    this.userApiService.getPosGps().then(result=>
      {
        let nom : string;
        let numero : string;
        let long : number;
        let lat: number;
     
        const tree=[];
        let test:UserApiMap;
        for(var i =0;i<Object.keys(result).length;++i){
          test =new UserApiMap;
          test.nom=result[i].nom;
          test.numero=result[i].numero;
          test.latitude=result[i].position_gps.Latitude;
          test.longitude=result[i].position_gps.Longitude;
          tree.push(test);

        }
        
        console.log("longueur "+tree.length);
        console.log(tree);
        this.nativeStorage.setItem('trees', {
          tree:tree
        });   
      }
      );
  }

}