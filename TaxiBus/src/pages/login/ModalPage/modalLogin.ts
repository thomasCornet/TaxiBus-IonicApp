import { Component } from '@angular/core';
import { ToastController, NavParams,LoadingController ,NavController,ViewController,AlertController} from 'ionic-angular';
import {UserApiService} from '../../../services/userapi.service';
import { SMS } from '@ionic-native/sms';
import { LoginPage } from '../login';
@Component({
    selector: 'page-modal-login',
    templateUrl: 'modalLogin.html'
  })
  export class ModalPageLogin {

      private titre;
      private numChoix;
      private loading: any;
      private erreurs;
      private data: any;
      private motDePasse: string='';
      private nom;
      private numero;
      private mobile;
      private email;
      private naissance;
      private ville;
      private postal;
      private adresse;
      private mdp;
      private mdpValid;
    
    constructor(private toastCtrl: ToastController,public loadingCtrl: LoadingController, private userApiService : UserApiService,private alertCtrl: AlertController,private sms: SMS,public params: NavParams,public viewCtrl: ViewController,public navCtrl: NavController){
      
        var choix=[
            {titre:"Nouveau mot de passe"},
            {titre:"Nouveau mot de passe"},
            {titre:"Inscription"}
        ];   
            this.titre=choix[this.params.get('titre').choix];
            this.numChoix=this.params.get('titre').choix;
             
    }

      smsSend(numero:string){
        var options = {
            replaceLineBreaks: false, 
            android: {
                intent: ''  
            }
        };
        this.motDePasse=this.generateur();
        this.sms.send(numero, 'Bonjour, votre nouveau mot de passe TaxiBus est: '+this.motDePasse);
      }

      changerMdp(){
        this.userApiService.postRecherche(this.numero)
        .then((result) => {
            this.data=result;
            JSON.stringify(this.data);   
            console.log(this.data[0].id);
            console.log(this.motDePasse);
            this.userApiService.patchChangerMotDePasse(this.data[0].id,this.motDePasse)
            .then((result)=>{
                console.log(this.data[0].id);
                console.log(this.motDePasse);
            },(err)=>{
                console.log(err);
            });

        })
      }

      generateur(){
        var alpha='abcdefghijknopqrstuvwxyzACDEFGHJKLMNPQRSTUVWXYZ12345679';
        var spe='!@#$+-*&_';
        var math=Math.floor(Math.random() * (spe.length-1));
        let mdp='';
        for(var i=0; i<8; ++i){
            if(math== i){
                mdp += spe.charAt(Math.floor(Math.random() * spe.length));
            }else{
                mdp += alpha.charAt(Math.floor(Math.random() * alpha.length));
            }
        }
        return mdp;
    }

      //****page "Vous n'avez pas de mot de passe ?"****
      verif(){
        let erreursL= [];
        if(this.mdp<8){
            erreursL.push("**Le mot de passe doit contenir au moins 8 caractères ! ");
        }
        if(this.mdp !==this.mdpValid){
            erreursL.push("**Les mots de passe ne correspondent pas ! ");
        }
        if(!this.mobile || !this.numero || !this.mdp || !this.mdpValid || !this.email){
            erreursL.push("**Champs manquants ! ");
        
        }
        if(this.mobile){
            if(this.mobile.length!=10){
                erreursL.push("**Numéro de mobile incorrect ! ");
            }
        }

        if(erreursL.length > 0){
            this.mdp='';
            this.mdpValid='';
            this.erreurs= erreursL.join('<br/>');
        }
        else{
            this.creationMdp();
        }

      }

      creationMdp(){
        this.showLoader();
        this.userApiService.postRecherche(this.numero)
        .then((result) => {
            this.data=result;
            JSON.stringify(this.data);   
        
            this.userApiService.patchCreationMdp(this.data[0].id,this.mobile,this.mdp,this.email)
            .then((datas)=>{
                this.loading.dismiss();
                this.toast("Votre mot de passe a été créé !");
            });
        },
        (err) => {
            this.loading.dismiss();
            let alert = this.alertCtrl.create({
                title: 'Attention !',
                subTitle: "Numéro d'usager inconnu !",
                buttons: ['Ok']
            });
            alert.present();  
        });
      }

      //Arret du LOADING
      dismiss() {
        this.navCtrl.push(LoginPage);
      }

      toast(phrase:string){
        let toast = this.toastCtrl.create({
            message: phrase,
            duration: 3000,
            position: 'bottom',
          
          });
      
         
            this.navCtrl.push(LoginPage);
         
      
          toast.present();
      }
      //Debut du loading
      showLoader(){
        this.loading = this.loadingCtrl.create({
            content: 'Création du mot de passe...'
        });
    
        this.loading.present();
      }

      //**** page "S'inscrire"****
      verifIns(){
        let erreursL= [];
        if(this.mdp<8){
            erreursL.push("**Le mot de passe doit contenir au moins 8 caractères ! ");
        }
        if(this.mdp !==this.mdpValid){
            erreursL.push("**Les mots de passe ne correspondent pas ! ");
        }
        if(!this.nom ||!this.ville || !this.postal || !this.adresse ||!this.naissance || !this.mobile  || !this.mdp || !this.mdpValid || !this.email){
            erreursL.push("**Champs manquants ! ");
        
        }
        if(this.mobile){
            if(this.mobile.length!=10){
                erreursL.push("**Numéro de mobile incorrect ! ");
            }
        }
        if(erreursL.length > 0){
            this.mdp='';
            this.mdpValid='';
            this.erreurs= erreursL.join('<br/>');
        }
        else{
            this.inscription();
        }   
      }

      inscription(){
        this.showLoader();
        this.userApiService.postInscription(this.nom,this.mobile,this.email,this.naissance,this.ville,this.postal,this.adresse,this.mdp)
        .then((datas)=>{
            this.loading.dismiss();
            this.toast("Votre compte a été créé avec succés !");
        },
        (err) => {
            this.loading.dismiss();
            let alert = this.alertCtrl.create({
                title: 'Problème !',
                subTitle: "Il semblerait avoir un problème de nature inconnu !",
                buttons: ['Ok']
            });
            alert.present();  
        });
      }
     
      //***page "Nouveau mot de passe"
      verifId(){
        let erreurL=[];
        if(!this.numero){
            erreurL.push("**Rentrez votre numéro d'usager");
        }
        if(erreurL.length>0){
            this.erreurs= erreurL.join('<br/>');
        }
        else{
            this.showLoader();
            this.userApiService.postRecherche(this.numero)
            .then((data)=>{
                this.loading.dismiss();
                this.data=data;
                let cacher=this.data[0].telephone;        
                for(var i=0;i<6;++i){
                    cacher=cacher.replace(this.data[0].telephone[i],'*')
                }
                console.log(this.data)
                JSON.stringify(this.data);
                if(this.data[0].telephone){
                    let alert = this.alertCtrl.create({
                        title: 'Recevez votre mot de passe !',
                        subTitle: "Votre numéro est: "+cacher+" ?",
                        buttons: [{
                            text:'Oui',
                            handler: () => {
                                this.smsSend(this.data[0].telephone);
                                this.changerMdp();
                                this.toast("Un mot de passe provisoir vous a été envoyé !");
                                this.navCtrl.push(LoginPage);
                              } 
                            },
                            {
                            text:'Non',
                            handler: () => {
                                this.navCtrl.push(ModalPageLogin,{titre:{choix:2}})
                              }
                        }]
                    });
                    alert.present(); 
                }else{
                    let alert = this.alertCtrl.create({
                        title: "Numéro de téléphone inconnu !",
                        subTitle: "Inscrivez vous sur l'application !",
                        buttons: [{
                            text:'Ok',
                            handler: () => {
                                this.navCtrl.push(ModalPageLogin,{titre:{choix:2}})
                              }
                        }]
                    });
                    alert.present(); 
                } 
            },
            (err) => {
                this.loading.dismiss();
                let alert = this.alertCtrl.create({
                    title: 'Dommage !',
                    subTitle: "Vous n'êtes pas encore inscrit !",
                    buttons: [{
                        text:'Ok',
                        handler: () => {
                            this.navCtrl.push(ModalPageLogin,{titre:{choix:2}})
                          }
                    }]
                });
                alert.present();  
            });
            
        }
    }
  }