import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { UserApiGlobal } from '../models/userapi.global';

@Injectable()
export class UserApiService{

    private baseUrl: string = "https://taxibus.ddns.fraxion.com:8083/Webservice_Repartition_Test/Service_Transport_Collectif/v1/";
    
   

    constructor(private http: Http){
        
    }

    login(credentials) {
        return new Promise((resolve, reject) => {  
            let headers = new Headers();
            headers.append('Authorization','Basic VGVzdF9UQzpqb2prMmQzZDZod2QzNA==')
            headers.append('Content-Type', 'application/json');

            this.http.post(this.baseUrl+'usager/authentification', {courriel:credentials.username,mot_passe:credentials.password}, {headers: headers})
              .subscribe(res => {
                resolve(res.json());
              }, (err) => {            
                reject(err);
              });
        });
      }











    public getUser(): Promise<UserApiGlobal>{

        let headers = new Headers();
        headers.append('Authorization','Basic VGVzdF9UQzpqb2prMmQzZDZod2QzNA==');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl+"route/liste",options)
        .toPromise()
        .then(response => response.json() as UserApiGlobal );
        
        
    }


}
