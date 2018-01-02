import { Component } from '@angular/core';
import { NavParams,NavController,Platform,App,AlertController} from 'ionic-angular';
import {UserApiService} from '../../services/userapi.service';
import {ModalPage} from '../profil/ModalPage/modal';
import { PlaintePage } from './Plainte/plainte';
import { NativeStorage } from '@ionic-native/native-storage';
import { UserApiProfil } from '../../models/user.api.profil';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html'
})
export class ProfilPage {
 

  private data: UserApiProfil = new UserApiProfil();
  private info:string;
  private image;
  private nom;
  private numero;
  private tree= [];

  constructor(private alertCtrl: AlertController,public app: App,private nativeStorage: NativeStorage ,public platform: Platform,public params: NavParams,public navCtrl: NavController, private userApiService : UserApiService) {
    nativeStorage.getItem('info')
    .then(
      data =>{
        this.data=data;
        this.nom=this.data.nom;
        this.numero=this.numero;
       }
    );
   
    platform.ready().then(() =>{
      
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
