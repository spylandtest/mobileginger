import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { api } from "../../app/global";

/*
  Generated class for the DevicecheckserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DevicecheckserviceProvider {

  constructor(public http: Http) {
    console.log('Hello DevicecheckserviceProvider Provider');
  }
  
  public getdevicecheck(DeviceId) {
    {
      return Observable.create(observer => {
      // At this point store the credentials to your backend!
    //  let signUpUrl = api.signUpUrl;
    //  let signUpUrl = api.endPoint+api.signUpUrl;
    let endPoint = '';
   // let endPoint = 'http://thecityshoppers.com/distribution';
    //let shopDetailUrl = '/api/insert.php';
    let deviceUrl = api.endPoint+api.deviceUrl;
        let headers = new Headers();
        let res = Array();
       headers.append('Content-Type', 'application/x-www-form-urlencoded');
    /*    headers.append('Access-Control-Allow-Headers', 'Content-Type');
        headers.append('Access-Control-Allow-Methods', 'GET');
        headers.append('Access-Control-Allow-Origin', '*'); */

    let data = "DeviceId="+DeviceId;
         //var data = JSON.stringify({username: credentials.email});
        console.log(data);

        this.http.post(deviceUrl,data,{headers: headers})
        .subscribe(data => {
        
          let response = data.json();
          let access = response.success;
       //    console.log(JSON.stringify(access.json()));
       console.log(JSON.stringify(access));
          res['access'] = access;
          res['message'] = false;
      //     observer.next(res);
     //      observer.complete();
     if (access==false)
            res['message'] =  response.message;
            observer.next(res);
            observer.complete();
        
        }, error => {
         let access = false;
          res['access'] = access;
          res['message'] = 'Oops! we had a problem.  Please try again in a few minutes';
           observer.next(res);
            observer.complete();
           
           // console.log(JSON.stringify(error.json()));
        });
    });
    }
  }



}
