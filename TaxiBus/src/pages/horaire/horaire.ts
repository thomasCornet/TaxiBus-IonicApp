import { Component } from '@angular/core';
import { NavController,AlertController,App} from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-horaire',
  templateUrl: 'horaire.html'
})
export class HorairePage {

  constructor(public app: App,public navCtrl: NavController,private alertCtrl: AlertController) {

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
