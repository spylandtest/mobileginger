import { HttpClient } from '@angular/common/http';
//import { Injectable } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { api } from "../../app/global";

/*
  Generated class for the AddconsumerserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AddconsumerserviceProvider {

  constructor(public http: Http) {
    console.log('Hello AddconsumerserviceProvider Provider');
  }

  public registerconsumer(consumerDetails) {
    {
      return Observable.create(observer => {
      // At this point store the credentials to your backend!
    //  let signUpUrl = api.signUpUrl;
    //  let signUpUrl = api.endPoint+api.signUpUrl;
    let endPoint = '';
   // let endPoint = 'http://thecityshoppers.com/distribution';
    //let shopDetailUrl = '/api/insert.php';
    let addConsumersUrl = api.endPoint+api.addConsumersUrl;
        let headers = new Headers();
        let res = Array();
       headers.append('Content-Type', 'application/x-www-form-urlencoded');
    /*    headers.append('Access-Control-Allow-Headers', 'Content-Type');
        headers.append('Access-Control-Allow-Methods', 'GET');
        headers.append('Access-Control-Allow-Origin', '*'); */

    let data = "estabName="+consumerDetails.EstabName+"&contactName="+consumerDetails.ContactName+"&address="+consumerDetails.Address+"&location="+consumerDetails.Location+"&landmark="+consumerDetails.LandMark+"&cupQuantityPerDay="+consumerDetails.CupQuantityPerDay+"&cupQuantityPerDay2="+consumerDetails.CupQuantityPerDay2+"&cupQuantityPerDay3="+consumerDetails.CupQuantityPerDay3+"&reach="+consumerDetails.reach+"&lat="+consumerDetails.Lat+"&lng="+consumerDetails.Lng+"&estabType="+consumerDetails.EstabType+"&contactNo="+consumerDetails.ContactNo+"&altNo="+consumerDetails.altNo+"&emailId="+consumerDetails.EmailId+"&cupSizes="+consumerDetails.CupSizes+"&cupSizes2="+consumerDetails.CupSizes2+"&cupSizes3="+consumerDetails.CupSizes3+"&remark="+consumerDetails.Remark;
         //var data = JSON.stringify({username: credentials.email});
        console.log(data);

        this.http.post(addConsumersUrl,data,{headers: headers})
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
