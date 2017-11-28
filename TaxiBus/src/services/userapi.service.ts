import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { UserApiGlobal } from '../models/userapi.global';

@Injectable()
export class UserApiService{

    private baseUrl: string = "https://randomuser.me/api/";
    private nombre: string = "10";
   

    constructor(private http: Http){

    }

    public getUser(): Promise<UserApiGlobal>{

        const url=`${this.baseUrl}`;

        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as UserApiGlobal);
        
        
    }


}
