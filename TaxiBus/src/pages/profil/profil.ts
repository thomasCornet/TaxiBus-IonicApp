import { Component } from '@angular/core';
import { NavParams,NavController,LoadingController,Platform,App,ToastController,AlertController} from 'ionic-angular';
import {UserApiService} from '../../services/userapi.service';
import {ModalPage} from '../profil/ModalPage/modal';
import { PlaintePage } from './Plainte/plainte';
import { NativeStorage } from '@ionic-native/native-storage';
import { UserApiProfil } from '../../models/user.api.profil';
import { LoginPage } from '../login/login';
import { UserApiReservation } from '../../models/user.api.reservation';
import { Refresher } from 'ionic-angular/components/refresher/refresher';

@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html'
})
export class ProfilPage {
 
  private loading:any;
  private data: UserApiProfil = new UserApiProfil();
  private data_Reservation;
  private info:string;
  private image;
  private nom;
  private numero;
  private id;
  private url_photo_usager;
  private tree= [];
  private reservation: UserApiReservation;
  private cards=[];

  constructor(public loadingCtrl: LoadingController,private toastCtrl: ToastController,private alertCtrl: AlertController,public app: App,private nativeStorage: NativeStorage ,public platform: Platform,public params: NavParams,public navCtrl: NavController, private userApiService : UserApiService) {

      
      nativeStorage.getItem('info')
      .then(
        data =>{
          this.data=data;
          this.id=data.id;
          this.nom=this.data.nom;
          this.numero=this.data.numero;
          this.url_photo_usager=this.data.url_photo_usager;
          if(!this.data.url_photo_usager){
            this.url_photo_usager="user.png";
          }
         }
      );

      nativeStorage.getItem('image').then((data)=>{
        this.url_photo_usager=data.url_photo_usager
      },(err)=>{})
      nativeStorage.getItem('reservation').then((data)=>{
        this.cards=data.reservation
      },(err)=>{})
    ProfilPage.constructor(this.url_photo_usager)

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

 

 
    doRefresh(refresher) { 
      this.cards=[];
     
      this.userApiService.getDemandeUsager(this.id)
      .then((data)=>{
        this.data_Reservation=data;

        for(var i =0;i<Object.keys(data).length;++i){
          this.reservation=new UserApiReservation;
          this.reservation.date_demande=this.data_Reservation[i].date_demande;
          this.reservation.demande_usager_id=this.data_Reservation[i].demande_usager_id;
          this.reservation.heure_arret_embarquement=this.data_Reservation[i].heure_arret_embarquement;
          this.reservation.mode_paiement=this.data_Reservation[i].mode_paiement;
          this.reservation.nom_arret_debarquement=this.data_Reservation[i].nom_arret_debarquement;
          this.reservation.nom_arret_embarquement=this.data_Reservation[i].nom_arret_embarquement;
          if(this.data_Reservation[i].etape==0){
            this.cards.push(this.reservation)
           };

          this.nativeStorage.setItem('reservation',{
            reservation:this.cards
          })
      }
      },(err)=>{

      })
      setTimeout(() => {
        refresher.complete();
      }, 2000);
      
    }
  
    annulerReservation(numero:any){
        this.userApiService.deleteReservation(numero)
        .then(data=>{
          this.presentToast("Votre réservation a été annulé !")
          this.nativeStorage.remove('reservation');
          this.navCtrl.push(ProfilPage)
        })
        
      
      
    }
  openModal(choixNum) {
     this.navCtrl.push(ModalPage,{choixNum:choixNum});
      }

  aPropos(){
    this.navCtrl.push(ModalPage,{choixNum:3});
  }

  imgChange(){
    this.navCtrl.push(ModalPage,{choixNum:4});
  }
  plainte(){
    this.navCtrl.push(PlaintePage);
  }

  seDeco(){
    let alert = this.alertCtrl.create({
      title: 'Déconnection !',
      subTitle: 'Voulez-vous vraiment vous déconnecter ?',
      buttons: [
      {
        text:'Non'
    },
    {
      text:'Oui',
      handler: () => {
        localStorage.clear();
        let nav=this.app.getRootNav();
        nav.setRoot(LoginPage);
      }
    }]
    });
    alert.present();

    
  }
  presentAlert(numero:any){
    let alert = this.alertCtrl.create({
      title: 'Attention !',
      subTitle: 'Voulez-vous vraiment annuler cette réservation ?',
      buttons: [{
        text:'Oui',
        handler: () => {
         this.annulerReservation(numero)
        }
      },
      {
        text:'Non'
    }]
    });
    alert.present();
  }
  presentToast(text:string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Toast Visualisé ! ');
    });
  
    toast.present();
  }

  presentLoadingCustom(message:string) {
    this.loading = this.loadingCtrl.create({
      content:message
    });
  
    this.loading.present();

   
  }
}
