import { Component } from '@angular/core';
import {NavParams ,LoadingController, NavController,ViewController,ToastController} from 'ionic-angular';
import {ProfilPage} from '../../profil/profil';
import {UserApiService} from '../../../services/userapi.service';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
    selector: 'page-modal-picture',
    templateUrl: 'modal-picture.html'
  })
export class PicturePage {
    private numChoix;
    private loading:any;
    private choix;
    private images=['boy.png','girl.png','man.png','woman.png'];
    private data;
    private id;
    constructor(private toastCtrl: ToastController,public loadingCtrl: LoadingController,private nativeStorage: NativeStorage, private userApiService : UserApiService,public params: NavParams,public viewCtrl: ViewController,public navCtrl: NavController) {
        var choix=[
            {name:"Avatar"},
            {name:"Galerie"}
           ];

           nativeStorage.getItem('info')
           .then(
             data =>{
               this.data=data;
               this.id=data.id;
              }
           );
        this.choix=choix[this.params.get('choixNum').choixNum]; 
        this.numChoix=this.params.get('choixNum').choixNum;
    }
    
    dismiss() {
        this.viewCtrl.dismiss();
      }

    choixImage(image){
        
        this.presentLoadingCustom("Chargement de l'avatar...")
       
        this.nativeStorage.setItem('image',{url_photo_usager:image})
        this.userApiService.patchChangerAvatar(this.id,image)
        .then((data)=>{
            this.loading.dismiss();
            this.navCtrl.push(ProfilPage);
        },(err)=>{
            this.presentToast(err)
        })
        
    }

    presentLoadingCustom(message:string) {
        this.loading = this.loadingCtrl.create({
          content:message
        });
      
        this.loading.present();
    
       
      }

      presentToast(text:string) {
        let toast = this.toastCtrl.create({
          message: text,
          position: 'bottom'
        });
      
      
        toast.present();
      }
    

  }