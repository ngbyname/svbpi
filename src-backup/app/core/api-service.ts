import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    // url = 'https://jsonplaceholder.typicode.com/todos/10';
    constructor(private http: HttpClient) {
    }

    getApiData(getReqData:any){
        if(getReqData && getReqData.params){
            return this.http.get(getReqData.url,{
                observe:'response',
                params:getReqData.params
            });
        }
        else{
            return this.http.get(getReqData.url,{
                observe:'response',
            });
        }
    }
    postApiData(postReqData:any){
        return this.http.post(postReqData.url,postReqData.data,{
            observe:'response'
        });
    }
}