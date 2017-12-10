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
    private verification :boolean=false;
    constructor(private emailComposer: EmailComposer){}

    envoyer(){
        this.verificationDate();
      if(this.verification) {

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
    }

    verificationDate(){
        var test = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
        let erreursL=[];
        if(this.date.match(test)){
            this.verification=true;
            erreursL.push("");
        }
        else{
            erreursL.push("*La date doit être au format jj/mm/aaaa");
        }
        if(erreursL.length > 0){
            this.erreurs= erreursL.join('<br/>');
          }
    }
  }