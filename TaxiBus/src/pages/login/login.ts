import { Component } from '@angular/core';
import { NavController, LoadingController,ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import {UserApiService} from '../../services/userapi.service';
import {ModalPageLogin} from './ModalPage/modalLogin';
import { NativeStorage } from '@ionic-native/native-storage';


@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})

export class LoginPage {
   
    private loading: any;
    private loginData = { username:"", password:"" };
    private data: any;
    private trees=[];

    constructor(private nativeStorage: NativeStorage ,public navCtrl: NavController, private userApiService : UserApiService,private toastCtrl: ToastController, public loadingCtrl: LoadingController) {
      
    }


    verifLogin() {
        this.showLoader();

        this.userApiService.postAuthentification(this.loginData)
        .then((result) => {
          this.loading.dismiss();
          this.data = result;
         
          this.nativeStorage.setItem('info', {
            id:this.data.id,
            nom:this.data.nom,
            email:this.data.courriel,
            url_photo_usager:this.data.url_photo_usager,
            numero:this.data.numero_usager,
            paiement:this.data.mode_paiement_actif
          });
        
         
          this.navCtrl.setRoot(TabsPage);
        }, (err) => {
          this.loading.dismiss();
          this.presentToast();
        });
      }
    
    showLoader(){
        this.loading = this.loadingCtrl.create({
            content: 'Vérification...'
        });
    
        this.loading.present();
      }

    presentToast() {
        let toast = this.toastCtrl.create({
          message: "Email et/ou mot de passe invalide !",
          duration: 3000,
          position: 'bottom',
        
        });
    
        toast.onDidDismiss(() => {
          console.log('Toast Visualisé !');
        });
    
        toast.present();
    }

    compte(titre){
      this.navCtrl.push(ModalPageLogin,{titre:titre});
    }
  

    
      
}