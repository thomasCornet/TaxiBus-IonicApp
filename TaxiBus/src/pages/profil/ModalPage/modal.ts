import { Component } from '@angular/core';
import {  NavParams ,NavController,ViewController,ToastController} from 'ionic-angular';
import { PicturePage} from '../ModalPicturePage/modal-picture';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { UserApiService } from '../../../services/userapi.service';
import { NativeStorage } from '@ionic-native/native-storage';
import { ProfilPage } from '../profil';
@Component({
    selector: 'page-modal',
    templateUrl: 'modal.html'
  })
  export class ModalPage {
    private choix;
    private numChoix;
    private data :any;
    private secret;
    private erreurs;
    private id;
    private courriel;
    private secret2;
    private information;
    private couple = { username:"", password:"" };
    
    constructor(private toastCtrl: ToastController,private nativeStorage: NativeStorage ,public params: NavParams,public viewCtrl: ViewController,public navCtrl: NavController, private photoLibrary: PhotoLibrary, private userApiService : UserApiService){
        this.nativeStorage.getItem('info')
        .then(
          datas =>{
            this.data=datas;
            this.id=this.data.id
            this.courriel=this.data.email;
           }
        );
        var choix=[
                   {name:"Email"},
                   {name:"Téléphone"},
                   {name:"Mot de passe"},  
                   {name: "A propos"},
                   {name: "Photo de Profil"}
                  ];
        if(this.params.get('choixNum')!=3 && this.params.get('choixNum')!=4){
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


    miseAJour(){

        if(this.numChoix==0){
            this.userApiService.patchChangerEmail(this.id,this.information)
            .then((data)=>{
                this.toast('Votre email a été correctement modifié !');
            })       
        }
       

        if(this.numChoix==1 ){
         this.userApiService.patchChangerTelephone(this.id,this.information)
         .then((data)=>{
            this.toast('Votre téléphone a été correctement modifié !');
        })   
        }
        

        if(this.numChoix==2){
            
        this.couple.username=this.courriel;
        this.couple.password=this.information;
         this.userApiService.postAuthentification(this.couple)
         .then((data)=>
         {
             this.userApiService.patchChangerMotDePasse(this.id,this.secret)
             this.toast('Votre mot de passe a été correctement modifié ! ');
          }
         ,(err)=>{
             this.navCtrl.push(ProfilPage)
             console.log(err);
         })
        }
     }

       verif(){
         let erreursL= [];
         if(this.secret<8){
            erreursL.push("**Le mot de passe doit contenir au moins 8 caractères ! ");
         }
         if(this.secret !==this.secret2){
             erreursL.push("**Les mots de passe ne correspondent pas ! ");
         }
         if(!this.information || !this.secret || !this.secret2 ){
             erreursL.push("**Champs manquants ! ");
         
         }
         if(erreursL.length > 0 ){
             this.erreurs= erreursL.join('<br/>');
           }
        else{
            this.miseAJour();
        }
       
        }

        verifInfo(){
            let erreursL= [];
            if(!this.information){
                erreursL.push("**Champ manquant ! ");
            }
            if(erreursL.length > 0 ){
                this.erreurs= erreursL.join('<br/>');
              }
            else{
                this.miseAJour();
            }
        }


        toast(phrase:string){
            let toast = this.toastCtrl.create({
                message: phrase,
                duration: 3000,
                position: 'bottom',
              
              });
            this.navCtrl.push(ProfilPage);                   
            toast.present();
          }
 
   
        
     
    
   }