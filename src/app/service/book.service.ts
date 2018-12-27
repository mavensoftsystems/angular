import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions,Headers } from "@angular/http";
import {EnvironmentSettings} from "../evnironment.constants";
import "rxjs";
import {Observable} from 'rxjs/Rx';

 



@Injectable({
  providedIn: 'root'
})
export class BookService {
    

  constructor(private http:Http, private env:EnvironmentSettings) { }


public saveBookingData(obj:any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var evnironment = "dev";
    var apiUrl = this.env.apiUrl(evnironment);
    var url = apiUrl+"/book";
    return this.http.post(url,obj,options).map((res:Response)=>{
     return res.json();
    }).catch(this.errorHandler);

  }

  public errorHandler(err):any {
    console.log("error raised..");
    return Observable.throw(err || "Internal server error");
  }
}
