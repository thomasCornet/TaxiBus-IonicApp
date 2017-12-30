import { Component } from '@angular/core';
import { NavController,AlertController,App } from 'ionic-angular';
import {MapsPage} from "./maps/maps";
import {ReserverPage} from "./reserver/reserver";
import {InformationPage} from "./information/information"
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {


  constructor(public app: App,public navCtrl: NavController,private alertCtrl: AlertController) {
    
   
   
  }
  
 
  
  showReserver(){
    this.navCtrl.push(ReserverPage);
  }
   showMaps(){
    this.navCtrl.push(MapsPage);
    
  }
  showInformation(){
    this.navCtrl.push(InformationPage);
  }
  seDeco(){
    let alert = this.alertCtrl.create({
      title: 'Déconnection !',
      subTitle: 'Voulez-vous vraiment vous déconnecter ?',
      buttons: [{
        text:'Oui',
        handler: () => {
          localStorage.clear();
          let nav=this.app.getRootNav();
          nav.setRoot(LoginPage);
        }
      },
      {
        text:'Non'
    }]
    });
    alert.present();

    
  }
  
}
