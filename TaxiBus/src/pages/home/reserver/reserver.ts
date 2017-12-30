import { Component } from '@angular/core';
import { NavController, Keyboard,LoadingController,ToastController,AlertController } from 'ionic-angular';
import * as TreeMapping from '../../../models/tree.mapping';
import {MapsPage} from "../maps/maps";
import { HomePage } from '../home';
import { UserApiService } from '../../../services/userapi.service';


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
    private choixSD:string;
    private choixSA:string;
    private cacher: boolean= false;
    private cacherB: boolean= false;
    private heures:String[]=["5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22"];
    private minutes:String[]=["00,10,20,30,40"];
    private date=new Date();
    private dateAnnee= this.date.getFullYear();
    
   private heure_Depart:string[];
   private heure_Arrivee:string[];

    constructor(private userApiService : UserApiService,public navCtrl: NavController, private alertCtrl: AlertController, private toastCtrl: ToastController,public keyboard: Keyboard,public loadingCtrl: LoadingController) {

     
      
      //Départ 
      this.cacher=true;

      //Arrivée
      this.cacherB=true;

    }

    secteurChoix(choix){
      let alert = this.alertCtrl.create();
      alert.setTitle('Choisissez un secteur !');

      alert.addInput({
        type: 'radio',
        label: 'Valleyfield - 100',
        value: 'Valleyfield - 100',
        checked:true
      });
  
      alert.addInput({
        type: 'radio',
        label: 'Valleyfield - 200',
        value: 'Valleyfield - 200',
        
      });
      alert.addInput({
        type: 'radio',
        label: 'Valleyfield - 300',
        value: 'Valleyfield - 300'
      });
      alert.addInput({
        type: 'radio',
        label: 'Valleyfield - 400',
        value: 'Valleyfield - 400'
      });
      alert.addInput({
        type: 'radio',
        label: 'Valleyfield - 500',
        value: 'Valleyfield - 500'
      });
      alert.addInput({
        type: 'radio',
        label: 'Valleyfield - 600',
        value: 'Valleyfield - 600'
      });
      alert.addInput({
        type: 'radio',
        label: 'Grande-Île - 1000',
        value: 'Grande-Île - 1000'
      });
      alert.addInput({
        type: 'radio',
        label: 'St-Timothée - 2000',
        value: 'St-Timothée - 2000',
        
      });
      
      
  
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
          console.log(choix.choix)
          if(choix.choix==1){
            this.choixSD=data+"";
           
          }
          else{
            this.choixSA=data+"";
         
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
      }


    }
    
    choixVille(item: string){
      this.choixA=item;
      this.keyboard.close();
      this.cacher=true;
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
        this.presentToast("ok");
      }, 3000);
     
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