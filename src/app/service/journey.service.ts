import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import "rxjs";
import {Observable} from 'rxjs/Rx';
import {EnvironmentSettings} from "../evnironment.constants";

@Injectable({
  providedIn: 'root'
})
export class JourneyService {

  constructor(private http:Http, private env:EnvironmentSettings) { }

  /**
   * getDetails
   */
  public getJourneyDetails() {
    console.log("service called");
    var evnironment = "dev";
    var apiUrl = this.env.apiUrl(evnironment);
    return this.http.get(apiUrl+"/journeyHistory").map((res:Response)=>{
      return res.json();
    }).catch(this.errorHandler);

  }

  public errorHandler(err):any {
    console.log("error raised..");
    return Observable.throw(err || "Internal server error");
  }
}
