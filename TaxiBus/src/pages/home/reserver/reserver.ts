import { Component } from '@angular/core';
import { NavController, Keyboard,LoadingController,ToastController,AlertController } from 'ionic-angular';
import {MapsPage} from "../maps/maps";
import { HomePage } from '../home';
import { UserApiService } from '../../../services/userapi.service';
import { NativeStorage } from '@ionic-native/native-storage';
import { ProfilPage } from '../../profil/profil';
import { Horaire } from '../../../models/horaire';

@Component({
    selector: 'page-reserver',
    templateUrl: 'reserver.html'
  })
  
  export class ReserverPage {
   
    private items: string[];
    private itemsB: string[];
    private valeur:string='';
    private choixA: string;
    private choixB: string;
    private myDate: string;
    private myHour: string;
    private erreurs;
    private loading: any;
    private choixSD:string;
    private choixSA:string;
    private cacher: boolean= false;
    private cacherB: boolean= false;
    private date=new Date();
    private dateAnnee= this.date.getFullYear();
    private heures=[];
    private selection;
    private id_A;
    private id_B;
    private data;
    private paiement;
    private valeurs;
    private selectionOptions;
    private usager_id:number;
    private secteur;
    private longueur;
    constructor(private nativeStorage: NativeStorage,private userApiService : UserApiService,public navCtrl: NavController, private alertCtrl: AlertController, private toastCtrl: ToastController,public keyboard: Keyboard,public loadingCtrl: LoadingController) {

      nativeStorage.getItem('info')
      .then(
        data =>{
          this.usager_id=data.id
        });
      
      //Départ 
      this.cacher=true;

      //Arrivée
      this.cacherB=true;

    }
    chargementSecteur(choix){
      this.presentLoadingCustom("Chargement secteur...")
      this.userApiService.getSecteur()
      .then((data)=>{
        this.secteur=data;
        this.loading.dismiss()
        this.longueur=Object.keys(data).length;
        this.secteurChoix(choix)
      })
    }

    secteurChoix(choix){
      let alert = this.alertCtrl.create();
      alert.setTitle('Choisissez un secteur !');
      
    
  
      for(var i =0;i<this.longueur;++i){
        if(this.secteur[i].route_id==1){
        alert.addInput({
          type: 'radio',
          label: this.secteur[i].nom,
          value: this.secteur[i].nom,
      
        });
      }
      }
      
      
  
      alert.addButton({
        text: 'Cancel',
        handler: data => {
          if(choix.choix==1){
            this.choixSD="";
           this.choixA="";
           this.items=[]
          }
          else{
            this.choixSA="";
            this.choixB="";
            this.itemsB=[]
         
          }
        }
      });
      alert.addButton({
        text: 'Valider',
        handler: data => {
          if(choix.choix==1){
            this.choixSD=data+"";
            this.choixA="";
            this.items=[]
           
          }
          else{
            this.choixSA=data+"";
            this.choixB="";
            this.itemsB=[]
          }
          this.initialisationItems(choix);
        }
      });
      alert.present();
    
    }


    initialisationItems(choix){
      if(choix.choix==1){
      this.userApiService.postPosGpsSecteur(this.choixSD)
      .then((data)=>{
        this.items=new Array(Object.keys(data).length);
        for(var i=0;i<Object.keys(data).length;++i){
          this.items[i]=data[i].nom
        }
        (err) => {    
          console.log(err)
        
          }
      })      
    }
    else{
      this.userApiService.postPosGpsSecteur(this.choixSA)
      .then((data)=>{
        this.itemsB=new Array(Object.keys(data).length);
        for(var i=0;i<Object.keys(data).length;++i){
          this.itemsB[i]=data[i].nom
        }
        (err) => {    
          console.log(err)
        
          }
      })  
    }
    }

    //Lieu de départ
    rechercheInTree(ev:any){
      
      let val=ev.target.value;
      
      
      if(val && val.trim()!='' && this.items){
        this.cacher=false;
        this.items=this.items.filter((item)=>{
            return (item.toLowerCase().indexOf(val.toLowerCase())>-1);          
       })

      }
      else{
        this.cacher=true;
        this.initialisationItems({choix:1})
      }


    }
    
    choixVille(item: string){
      this.choixA=item;
      this.keyboard.close();
      this.cacher=true;
      this.presentLoadingCustom("Recherche...")
      this.userApiService.postArretRecherche(this.choixA)
      .then((data)=>{
        this.loading.dismiss()
        this.id_A=data[0].id;
        
      },
    (err)=>{
      this.presentToast(err)
    })
    }

    //Lieu d'arrivée
   rechercheInTreeB(ev:any){
     
      let val=ev.target.value;
    
      
      if(val && val.trim()!='' && this.itemsB){
        this.cacherB=false;
        this.itemsB=this.itemsB.filter((item)=>{   
          console.log(this.itemsB);
          
        return (item.toLowerCase().indexOf(val.toLowerCase())>-1);
       })

      

      }
      else{
        this.cacherB=true;
        this.initialisationItems({choix:2})
      }

    }

    choixVilleB(item: string){
      this.choixB=item;
      this.keyboard.close();
      this.cacherB=true;
      this.presentLoadingCustom("Recherche...")
      this.userApiService.postArretRecherche(this.choixB)
      .then((data)=>{
        this.loading.dismiss();
       this.id_B=data[0].id;
      
       
     })
     
    }
    dateChoisi(){
      this.heures=[];
      this.chargementDesHeures();
    }

    showArrets(){
      this.navCtrl.push(MapsPage);
    }



    verification(){
      let erreursL= [];
      let date:boolean=true;
      let dateF=new Date();
      let monTemps:any; 
      let minute=dateF.getMinutes();
      let dateAnnee= dateF.getFullYear();
      let dateJour=dateF.getDate();
      let dateChoisi=new Date(this.myDate)
     
      dateChoisi.setDate(dateChoisi.getDate()+1)
     

      if(!this.choixA){
        erreursL.push("**Veuillez entrer une ville de départ ! ");
      }
      if(!this.choixB){
        erreursL.push("**Veuillez entrer une ville d'arrivée ! ");
      }
      if(!this.myDate){
        erreursL.push("**Veuillez entrer une date de départ ! ");
      }
      
      if( dateChoisi<dateF){
        erreursL.push("**Date inférieur à la date du jour !")
       
      }

      if(!this.myHour){
        erreursL.push("**Veuillez entrer une heure de départ !");
      }   
      
      if(erreursL.length > 0 ){
        this.erreurs= erreursL.join('<br/>');
      }
      else{
      
      this.presentLoadingCustom( 'Vérification du paiement...');
      this.userApiService.getModePaiement(this.usager_id+"",this.id_A+"",this.id_B+"")
      .then((data)=>{
        this.loading.dismiss();
        this.paiement=data;
        this.alertMessagePrix("Prix à payer au chauffeur: "+this.paiement.valeur+"$")
       
      },
    (err)=>{
      this.alertMessage(err)
    })
      }
    }
    
    chargementDesHeures(){
     
      console.log("a"+this.id_A)
      console.log("b"+this.id_B)
      this.presentLoadingCustom('Recherche des heures disponibles...');
      if(this.id_A && this.id_B){
        this.userApiService.postHoraireListe(this.id_A,this.id_B,this.myDate)
        .then((data)=>{
          
          this.data=data;       
          this.loading.dismiss();
          let heureInfo:Horaire;
          for(let i=0;i<Object.keys(data).length-(Object.keys(data).length/2);++i){
           for( let j=0;j<Object.keys(data).length;++j){
            if(this.data[j].type_horaire==0 ){
              heureInfo=new Horaire;
              heureInfo.route_id=this.data[j].route_id
              heureInfo.heure_arret_embarquement=this.data[j].heure_arret_embarquement;
              heureInfo.horaire_id_embarquement=this.data[j].horaire_id_embarquement;
              heureInfo.horaire_id_debarquement=this.data[j].horaire_id_debarquement;
              heureInfo.type_horaire=this.data[j].type_horaire;
              this.heures.push(heureInfo);
              i++;
            }
            
          }
          }
         
        })
      }

      
      else{

      }
     
    }

   

   alertMessage(message:string){
    let alert = this.alertCtrl.create({
      title: 'Attention !',
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();
   }

   alertMessagePrix(message:string){
    let alert = this.alertCtrl.create({
      title: 'Coût de la course ',
      subTitle: message,
      buttons: [
      {
        text:'Annuler'
      },
      {
        text:'Réserver',
        handler:data=>{
          this.creationReservation();
        }
      }
    ]
    });
    alert.present();
   }

    creationReservation(){
      let route_id;
      let id_emb;
      let id_deb;
      for(let i=0;i<this.heures.length;++i){
        if(this.myHour===this.heures[i].heure_arret_embarquement){
          route_id=this.heures[i].route_id;
          id_deb=this.heures[i].horaire_id_debarquement;
          id_emb=this.heures[i].horaire_id_embarquement;
        }
      }
      this.userApiService.postCreationDemandeUsager(this.paiement.valeur,this.myDate,this.usager_id,route_id,id_emb,id_deb)
      .then((data)=>{
        this.presentToast("Réservation effectué avec succés")
        this.navCtrl.push(ProfilPage)
      })
    } 

    presentLoadingCustom(message:string) {
      this.loading = this.loadingCtrl.create({
        content:message
      });
    
      this.loading.present();

     
    }

    presentToast(test:string) {
      let toast = this.toastCtrl.create({
        message: test,
        duration: 3000,
        position: 'bottom'
      });
    
      toast.onDidDismiss(() => {
        console.log('Toast Visualisé ! ');
      });
    
      toast.present();
    }


   
    
  }  