import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { api } from "../../app/global";
/*
  Generated class for the FilterserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FilterserviceProvider {
//HttpClient
  constructor(public http: Http) {
    console.log('Hello FilterserviceProvider Provider');
  }

  public getFilterDetails() {
    console.log('hi test shiva');
    return Observable.create(observer => {
      // At this point make a request to your backend to make a real check!
   //   let empVendorUrl = api.empVendorUrl;
      let filterDetailsUrl = api.endPoint+api.filterDetailsUrl+'1';
      let headers = new Headers();
      let res = Array();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
     // let data = "employee=154";
       let data = "";
       //var data = JSON.stringify({username: credentials.email});
     console.log(data);
      this.http.get(filterDetailsUrl,{headers: headers})
      .subscribe(data => {
        console.log(data);
      // console.log(JSON.stringify(data.json));
        let response = data.json();
        console.log(response);
        let access = response.success;
      //  let access = response.status;
   // console.log(access);
         if (access=='true') {
        let estabTypes = response.estabTypes;
        let loactions = response.loactions;
        console.log('hello moto');
         console.log(estabTypes);
         console.log(loactions);
        res['estabTypes'] = estabTypes;
        res['loactions'] = loactions;
       // let access = true;
         }
        res['access'] = access;         
        res['message'] = false;
          observer.next(res);
          observer.complete();
      }, error => {
        let access = false;
        res['access'] = access;
        res['message'] = 'Oops! we had a problem.  Please try again in a few minutes';
         observer.next(res);
          observer.complete();
         
      });

      });
  }

}
