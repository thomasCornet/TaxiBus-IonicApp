import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';



import { UserApiMap } from '../models/user.api.map';

@Injectable()
export class UserApiService{

    private baseUrl: string = "https://taxibus.ddns.fraxion.com:8083/Webservice_Repartition_Test/Service_Transport_Collectif/v1/";
    
   

    constructor(private http: Http){
        
    }

    //Permet d'authentifier un utilisateur en envoyant login et mdp
    public postAuthentification(credentials) {
        return new Promise((resolve, reject) => {  
            let headers = new Headers();
            headers.append('Authorization','Basic VGVzdF9UQzpqb2prMmQzZDZod2QzNA==')
            headers.append('Content-Type', 'application/json');

            this.http.post(this.baseUrl+'usager/authentification', {courriel:credentials.username,mot_passe:credentials.password}, {headers: headers})
              .subscribe(res => {
                resolve(res.json() );
              }, (err) => {            
                reject(err);
              });
        });
      }

      //Récupére informations pour la google Map
      public getPosGps(){
        return new Promise((resolve, reject) => {  
          let headers = new Headers();
          headers.append('Authorization','Basic VGVzdF9UQzpqb2prMmQzZDZod2QzNA==');
          headers.append('Content-Type', 'application/json');
          let options = new RequestOptions({ headers: headers });

          this.http.get(this.baseUrl+"arret/liste",options)
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {            
            reject(err);
          });
                
        });
        }

        //Récupére les informations des arrêts grace au secteur
        public postPosGpsSecteur(secteur:string){
          return new Promise((resolve, reject) => {  
            let headers = new Headers();
            headers.append('Authorization','Basic VGVzdF9UQzpqb2prMmQzZDZod2QzNA==');
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({ headers: headers });
           

            this.http.post(this.baseUrl+"arret/recherche",{secteur:secteur},options)
            .subscribe(res => {
              resolve(res.json());
            }, (err) => {            
              reject(err);
            });
                  
          });
          }

        //Récupére l'id de l'arrêts grace au nom
        public postArretRecherche(nom:string){
          return new Promise((resolve, reject) => {  
            let headers = new Headers();
            headers.append('Authorization','Basic VGVzdF9UQzpqb2prMmQzZDZod2QzNA==');
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({ headers: headers });
           

            this.http.post(this.baseUrl+"arret/recherche",{nom:nom,route_id:1},options)
            .subscribe(res => {
              resolve(res.json());
            }, (err) => {            
              reject(err);
            });
                  
          });
          }
          //Récupére tous les secteurs
        public getSecteur(){
          return new Promise((resolve, reject) => {  
            let headers = new Headers();
            headers.append('Authorization','Basic VGVzdF9UQzpqb2prMmQzZDZod2QzNA==');
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({ headers: headers });
           

            this.http.get(this.baseUrl+"secteur/liste",options)
            .subscribe(res => {
              resolve(res.json());
            }, (err) => {            
              reject(err);
            });
                  
          });
          }

        //Récupére les horaires disponible pour un embarquement a un arret précis
        public postHoraireListe(depart:number,arrivee:number,filtre:string){
          return new Promise((resolve, reject) => {  
            let headers = new Headers();
            headers.append('Authorization','Basic VGVzdF9UQzpqb2prMmQzZDZod2QzNA==');
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({ headers: headers });
           

            this.http.post(this.baseUrl+"horaire/liste",{arret_id_embarquement:depart,arret_id_debarquement:arrivee,filtre_date:filtre},options)
            .subscribe(res => {
              resolve(res.json()  );
            }, (err) => {            
              reject(err);
            });
                  
          });
        }

         //Récupére le prix a payer pour l'usager
         public getModePaiement(usager:string,depart:string,arrivee:string){
          return new Promise((resolve, reject) => {  
            let headers = new Headers();
            headers.append('Authorization','Basic VGVzdF9UQzpqb2prMmQzZDZod2QzNA==');
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({ headers: headers });
         
            this.http.get(this.baseUrl+"usager/"+usager+"/detecte-mode-paiement/"+depart+"/"+arrivee,options)
            .subscribe(res => {
              resolve(res.json()  );
            }, (err) => {            
              reject(err);
            });
                  
          });
        }
        
        //Crée une réservation
        public postCreationDemandeUsager(paiement:string,date:string,usager:number,route:number,depart:number,arrivee:number){
          return new Promise((resolve, reject) => {  
            let headers = new Headers();
            headers.append('Authorization','Basic VGVzdF9UQzpqb2prMmQzZDZod2QzNA==');
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({ headers: headers });
         
            this.http.post(this.baseUrl+"demande-usager",{mode_paiement:paiement,date_demande:date,usager_id:usager,route_id:route,horaire_id_embarquement:depart,horaire_id_debarquement:arrivee },options)
            .subscribe(res => {
              resolve(res.json()  );
            }, (err) => {            
              reject(err);
            });
                  
          });
        }
      //Annule une  réservation
      public deleteReservation(numero:string) {
        return new Promise((resolve, reject) => {  
          let headers = new Headers();
          headers.append('Authorization','Basic VGVzdF9UQzpqb2prMmQzZDZod2QzNA==');
          headers.append('Content-Type', 'application/json');
          let options = new RequestOptions({ headers: headers });
          
          this.http.delete(this.baseUrl+"demande-usager/"+numero,options)
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {            
            reject(err);
          });
          
        } );
      }

      //recherche usager grace au numero usager
      public postRecherche(numero : string) {
        return new Promise((resolve, reject) => {  
            let headers = new Headers();
            headers.append('Authorization','Basic VGVzdF9UQzpqb2prMmQzZDZod2QzNA==')
            headers.append('Content-Type', 'application/json');
          
          
            this.http.post(this.baseUrl+'usager/recherche', {numero:numero}, {headers: headers})
              .subscribe(res => {
                resolve(res.json() );
              }, (err) => {            
                reject(err);
              });
        });
      }

      
      

      //permet de créer un mot de passe pour un usager ayant déja un id
      public patchCreationMdp(numero : number, mobile : string, mdp : string, email:string) {
        return new Promise((resolve, reject) => {  
          let headers = new Headers();
          headers.append('Authorization','Basic VGVzdF9UQzpqb2prMmQzZDZod2QzNA==');
          headers.append('Content-Type', 'application/json');
          let options = new RequestOptions({ headers: headers });
          
          this.http.patch(this.baseUrl+"usager/"+numero,{telephone:mobile, courriel:email, mot_passe:mdp},options)
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {            
            reject(err);
          });
          
        } );
      }

      //Crée un nouvel usager (inscription)
      public postInscription(nom: string, mobile:string,email:string,naissance:string,ville:string,postal:string,adresse:string,mdp:string) {
        return new Promise((resolve, reject) => {  
            let headers = new Headers();
            headers.append('Authorization','Basic VGVzdF9UQzpqb2prMmQzZDZod2QzNA==')
            headers.append('Content-Type', 'application/json');
          
            this.http.post(this.baseUrl+'usager', {nom:nom,telephone:mobile,adresse:adresse,ville:ville,code_postal:postal,courriel:email,date_naissance:naissance,mot_passe:mdp}, {headers: headers})
              .subscribe(res => {
                resolve(res.json() );
              }, (err) => {            
                reject(err);
              });
        });
      }

      //changer mot de passe
      public patchChangerMotDePasse(numero : number, changement : string) {
        return new Promise((resolve, reject) => {  
          let headers = new Headers();
          headers.append('Authorization','Basic VGVzdF9UQzpqb2prMmQzZDZod2QzNA==');
          headers.append('Content-Type', 'application/json');
          let options = new RequestOptions({ headers: headers });
          
          this.http.patch(this.baseUrl+"usager/"+numero,{mot_passe:changement},options)
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {            
            reject(err);
          });
          
        } );
      }
      //changer email
      public patchChangerEmail(numero : number, changement : string) {
        return new Promise((resolve, reject) => {  
          let headers = new Headers();
          headers.append('Authorization','Basic VGVzdF9UQzpqb2prMmQzZDZod2QzNA==');
          headers.append('Content-Type', 'application/json');
          let options = new RequestOptions({ headers: headers });
          
          this.http.patch(this.baseUrl+"usager/"+numero,{courriel:changement},options)
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {            
            reject(err);
          });
          
        } );
      }
      //Changer telephone
      public patchChangerTelephone(numero : number, changement : string) {
        return new Promise((resolve, reject) => {  
          let headers = new Headers();
          headers.append('Authorization','Basic VGVzdF9UQzpqb2prMmQzZDZod2QzNA==');
          headers.append('Content-Type', 'application/json');
          let options = new RequestOptions({ headers: headers });
          
          this.http.patch(this.baseUrl+"usager/"+numero,{telephone:changement},options)
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {            
            reject(err);
          });
          
        } );
      }

      //Changer avatar
      public patchChangerAvatar(numero : number, changement : string) {
        return new Promise((resolve, reject) => {  
          let headers = new Headers();
          headers.append('Authorization','Basic VGVzdF9UQzpqb2prMmQzZDZod2QzNA==');
          headers.append('Content-Type', 'application/json');
          let options = new RequestOptions({ headers: headers });
          
          this.http.patch(this.baseUrl+"usager/"+numero,{url_photo_usager:changement},options)
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {            
            reject(err);
          });
          
        } );
      }

    
      //Changer telephone
      public getDemandeUsager(numero:string) {
        return new Promise((resolve, reject) => {  
          let headers = new Headers();
          headers.append('Authorization','Basic VGVzdF9UQzpqb2prMmQzZDZod2QzNA==');
          headers.append('Content-Type', 'application/json');
          let options = new RequestOptions({ headers: headers });
          
          this.http.get(this.baseUrl+"demande-usager/liste/"+numero,options)
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {            
            reject(err);
          });
          
        } );
      }

      
     

     

}
