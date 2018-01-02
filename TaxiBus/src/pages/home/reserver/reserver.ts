import { Component } from '@angular/core';
import { NavController, Keyboard,LoadingController,ToastController,AlertController } from 'ionic-angular';
import {MapsPage} from "../maps/maps";
import { HomePage } from '../home';
import { UserApiService } from '../../../services/userapi.service';
import { NativeStorage } from '@ionic-native/native-storage';

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
        console.log("AAAAAAA"+this.id_A)
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
      
       this.chargementDesHeures();
     })
     
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

      console.log("finishhhh"+this.myHour)
      if(!this.choixA){
        erreursL.push("**Veuillez entrer une ville de départ ! ");
      }
      if(!this.choixB){
        erreursL.push("**Veuillez entrer une ville d'arrivée ! ");
      }
      if(!this.myDate){
        erreursL.push("**Veuillez entrer une date de départ ! ");
      }
      
      if( new Date(this.myDate).getDate()+1<dateJour){
        this.alertMessage('Date inférieur à la date du jour',)
        date=false;
      }

      if(!this.myHour){
        erreursL.push("**Veuillez entrer une heure de départ !");
      }   
      
      if(erreursL.length > 0 || date==false){
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
        this.userApiService.postHoraireListe(this.id_A,this.id_B)
        .then((data)=>{
          this.heures.length=Object.keys(data).length;
          this.data=data;       
          this.loading.dismiss()
          for(let i=0;i<Object.keys(data).length;++i){
            this.heures[i]=this.data[i].heure_arret_embarquement;
            
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
      buttons: [{
        text:'Réserver',
        handler:data=>{
          this.creationReservation();
        }
      },
      {
        text:'Annuler'
      }
    ]
    });
    alert.present();
   }

    creationReservation(){
      this.userApiService.postCreationDemandeUsager(this.paiement.valeur,this.myDate,this.usager_id,1,13576,21587)
      .then((data)=>{
        this.presentToast("Réservation effectué")
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