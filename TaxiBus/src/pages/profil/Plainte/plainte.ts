import { Component } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer';

@Component({
    selector: 'page-plainte',
    templateUrl: 'plainte.html'
  })

  export class PlaintePage {
    private date;
    private nom;
    private chauffeur;
    private numero;
    private temoin;
    private activite;
    private details;
    private erreurs;
    constructor(private emailComposer: EmailComposer){

      
    }

    envoyer(){
       
   
        if(!this.details){
          this.details="";
        }
         let email = {
            to: 'cornet.thomas017@gmail.com',
            /*//cc: 'test@yahoo.fr',
            //bcc: ['john@doe.com', 'jane@doe.com'],
            attachments: [
              'file://img/logo.png',
              'res://icon.png',
              'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
              'file://README.pdf'
            ],*/
            subject: 'Plainte',
            body: 'Bonjour, <br><br>'+this.nom+" numéro d'usager: "+this.numero+".<br>Je voudrais formuler une plainte pour un incident arrivé le "+this.date+" avec le chauffeur "+this.chauffeur+".<br>Témoin:"+this.temoin+".<br>"+this.activite+".<br>"+this.details+"<br><br> Merci, Cordialement",
            isHtml: true
          };
        this.emailComposer.open(email);
        
    }

    verificationDate(){
        let erreursL=[]
        if(!this.nom || !this.numero || !this.date || !this.activite || !this.chauffeur){
          erreursL.push("**Champs manquants");
        }
        
        if(erreursL.length > 0){
            this.erreurs= erreursL.join('<br/>');
          }
          else{
            this.envoyer();
          }
    }
  }