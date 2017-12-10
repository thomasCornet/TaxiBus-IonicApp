import { Component } from '@angular/core';
import { NavController, Platform, Keyboard,LoadingController } from 'ionic-angular';
import * as TreeMapping from '../../../models/tree.mapping';
import {MapsPage} from "../maps/maps";
import { HomePage } from '../home';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


@Component({
    selector: 'page-reserver',
    templateUrl: 'reserver.html'
  })
  
  export class ReserverPage {

    private trees: TreeMapping.Treemap[];
    private items: string[];
    private itemsB: string[];
    private valeur:string='';
    private choixA: string;
    private choixB: string;
    private myDate: string;
    private myHour: string;
    private erreurs;
    private cacher: boolean= false;
    private cacherB: boolean= false;
    private heures:String[]=["5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22"];
    private minutes:String[]=["00,10,20,30,40"];
    private date=new Date();
    private dateAnnee= this.date.getFullYear();
    
   

    constructor(public navCtrl: NavController, public platform: Platform  , private alertCtrl: AlertController, private toastCtrl: ToastController,public keyboard: Keyboard,public loadingCtrl: LoadingController) {

      this.trees=TreeMapping.TreeMappingList;
      
      //Départ
      this.items=new Array(this.trees.length);
      this.cacher=true;

      //Arrivée
      this.itemsB=new Array(this.trees.length);
      this.cacherB=true;

    }

    initialisationItems(){
      for(var i=0;i<this.trees.length;++i){
        this.items[i]=this.trees[i].name;
      }
    }

    //Lieu de départ

    rechercheInTree(ev:any){
      
      let val=ev.target.value;
      this.initialisationItems();
      
      if(val && val.trim()!=''){
        this.cacher=false;
        this.items=this.items.filter((item)=>{
            return (item.toLowerCase().indexOf(val.toLowerCase())>-1);          
       })

      }
      else{
        this.cacher=true;
      }


    }
    
    choixVille(item: string){
      this.choixA=item;
      this.keyboard.close();
      this.cacher=true;
    }

    //Lieu d'arrivée

    initialisationItemsB(){
      
      for(var i=0;i<this.trees.length;++i){
        this.itemsB[i]=this.trees[i].name;
      }
    }

   rechercheInTreeB(ev:any){
     
      let val=ev.target.value;
      this.initialisationItemsB();
      
      if(val && val.trim()!=''){
        this.cacherB=false;
        this.itemsB=this.itemsB.filter((item)=>{   
          console.log(this.itemsB);
          /*for(var i=0;i<this.itemsB.length;++i){
            if(i>10){
             this.itemsB.pop();
            }
          }*/
        return (item.toLowerCase().indexOf(val.toLowerCase())>-1);
       })

      

      }
      else{
        this.cacherB=true;
      }

    }
    choixVilleB(item: string){
      this.choixB=item;
      this.keyboard.close();
      this.cacherB=true;
    }


    showArrets(){
      this.navCtrl.push(MapsPage);
    }



    verification(){
      let erreursL= [];
      let date:boolean=true;
      let dateF=new Date();
      let monTemps:any; 
      let heureChoix:any;
      let heure=dateF.getHours();
      let minute=dateF.getMinutes();
      let dateAnnee= dateF.getFullYear();
      let dateJour=dateF.getDate();
      let heureActu=heure*60+minute;

      if(!this.choixA){
        erreursL.push("**Veuillez entrer une ville de départ ! ");
      }
      if(!this.choixB){
        erreursL.push("**Veuillez entrer une ville d'arrivée ! ");
        console.log(heureActu+" choix "+heureChoix);
      }
      if(!this.myDate){
        erreursL.push("**Veuillez entrer une date de départ ! ");
      }
      
      if( new Date(this.myDate).getDate()+1<dateJour){
        let alert = this.alertCtrl.create({
          title: 'Attention !',
          subTitle: 'Date inférieur à la date du jour',
          buttons: ['Ok']
        });
        alert.present();
        date=false;
        console.log(this.myDate+" et "+new Date(this.myDate+"Z")+" et "+this.date+" date du jour: "+dateJour+" date: "+ new Date(this.myDate).getDate());
      }

      if(!this.myHour){
        erreursL.push("**Veuillez entrer une heure de départ !");
      }
      else{
        monTemps=this.myHour.split(":");
        heureChoix=Number(monTemps[0])*60+Number(monTemps[1]);
      }
      if((heureChoix-heureActu)<60){
        let alert = this.alertCtrl.create({
          title: 'Attention !',
          subTitle: "Cette heure n'est plus disponible aujourd'hui !",
          buttons: ['Ok']
        });
        alert.present();
        date=false;
      }
      
      if(erreursL.length > 0 || date==false){
        this.erreurs= erreursL.join('<br/>');
      }
      else{
      this.presentLoadingCustom();
     
      }
    }

   

    presentLoadingCustom() {
      let loading = this.loadingCtrl.create({
        content: 'Vérification du paiement...'
      });
    
      loading.present();
    
      setTimeout(() => {
        
        loading.dismiss();
        this.navCtrl.push(HomePage);
        this.presentToast();
      }, 3000);
     
    }

    presentToast() {
      let toast = this.toastCtrl.create({
        message: 'Réservation effectué avec succés! ',
        duration: 3000,
        position: 'bottom'
      });
    
      toast.onDidDismiss(() => {
        console.log('Toast Visualisé ! ');
      });
    
      toast.present();
    }


   
    
  }  