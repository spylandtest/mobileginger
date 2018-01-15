import { Component } from '@angular/core';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavController, AlertController, Loading, LoadingController,NavParams,IonicPage } from 'ionic-angular';
import { AddconsumerserviceProvider } from '../../providers/addconsumerservice/addconsumerservice';
import { FilterserviceProvider } from '../../providers/filterservice/filterservice';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
//import { Geolocation } from '@ionic-native/geolocation';
import { Geolocation,Geoposition } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { DevicecheckserviceProvider } from '../../providers/devicecheckservice/devicecheckservice';



/**
 * Generated class for the AddconsumerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addconsumer',
  templateUrl: 'addconsumer.html',
})
export class AddconsumerPage {

  DeviceId;
//  DeviceId ='865980023784959';
  //DeviceId ='865980029';
  model;
  subLocality;
  latitude;
  longitude;
  items;
  estabTypes=[];
  loactions=[];
  loading: Loading;
  createSuccess = false;
  devicevalue = false;
  consumerDetails = {EstabName: '', ContactName: '', Address: '', Location: '',LandMark: '',CupQuantityPerDay: '',CupQuantityPerDay2: '',CupQuantityPerDay3: '',reach: '',Lat:'',Lng: '', EstabType: '',ContactNo: '',altNo: '',EmailId: '',CupSizes: '',CupSizes2: '',CupSizes3: '',Remark: '' };
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private addconsumer: AddconsumerserviceProvider,private filter: FilterserviceProvider, private loadingCtrl: LoadingController,public geolocation: Geolocation,public nativeGeocoder:NativeGeocoder, public loact:LocationAccuracy,private device: Device,private uniqueDeviceID: UniqueDeviceID,public checkdevice:DevicecheckserviceProvider ) {
  // this.DeviceId = this.device.uuid;
  //this.DeviceId = ;
  this.DeviceId = this.device.uuid;
  this.model = this.device.model;
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddconsumerPage');
    this.getFilterDetails();
    this.getloadmap();
    this.getdevicecheck();
       
  }
  getdevicecheck(){

    //this.showLoading()
    console.log(this.DeviceId);
   this.checkdevice.getdevicecheck(this.DeviceId).subscribe(res => {
     let success = res['access'];
    if (success) {
          // this.cataloglist = res['catalogList'];
          this.devicevalue = true;
          setTimeout(() => {
          this.loading.dismiss();
       });
     //  this.showPopup("Success", "device id exists");
       
    } else {
      setTimeout(() => {
        this.loading.dismiss();
       // this.showPopup("Success", "device id doesnot exists please check admin ");
    });
    }
    },
    error => {
    setTimeout(() => {
           this.loading.dismiss();
        });
    this.showPopup("Error", error);
    });

  }


  getloadmap(){

    let enableOption={
      timeout: 10000,
      enableHighAccuracy:true
    };

    this.geolocation.getCurrentPosition(enableOption).then((position) => {
      this.latitude= position.coords.latitude;
this.longitude= position.coords.longitude;
console.log(this.longitude);
console.log(this.latitude);
console.log(this.DeviceId);
console.log(this.model);
//this.geoCuntory(position);
        }).catch((error) => {
          alert(error);
          setTimeout(() => {
            this.loading.dismiss();
         });
        });

        
        /*  setTimeout(() => {
            this.loading.dismiss();
         }); */

        
  }
  geoCuntory(pos)
  {
    
   this.nativeGeocoder.reverseGeocode(pos.coords.latitude, pos.coords.longitude).then((res:NativeGeocoderReverseResult) => {
   
 /*  
    this.countryName=res.countryName;
  this.administrativeArea=res.administrativeArea;
     this.subAdministrativeArea=res.subAdministrativeArea;
       this.postalCode=res.postalCode;
    this.locality=res.locality;*/
    this.subLocality=res.subLocality;

    setTimeout(() => {
      this.loading.dismiss();
   });

   }, (error)=>{
    alert(error);
    setTimeout(() => {
      this.loading.dismiss();
   });
   
 }) 

  }


  public getFilterDetails() {
    this.showLoading()
this.filter.getFilterDetails().subscribe(res => {
 let success = res['access'];
if (success) {
      // this.cataloglist = res['catalogList'];
         this.estabTypes = res['estabTypes'];
         this.loactions = res['loactions'];
         
         
   console.log(this.estabTypes);
   console.log(this.loactions);
       setTimeout(() => {
        this.loading.dismiss();
    });
  //this.showPopup("Success", "Successfully Added");
} else {
  setTimeout(() => {
    this.loading.dismiss();
});
}
},
error => {
setTimeout(() => {
       this.loading.dismiss();
    });
this.showPopup("Error", error);
});
}

  public registerconsumer() {
    this.showLoading()
this.addconsumer.registerconsumer(this.consumerDetails).subscribe(res => {
  let success = res['access'];
 if (success) {
        this.createSuccess = true;
        setTimeout(() => {
        this.loading.dismiss();
     });
     this.showPopup("Success", "Successfully Registered");
 } else {
    let message = res['message'];
    if(message)
    {
       setTimeout(() => {
        this.loading.dismiss();
     });
     this.showPopup("Error",message);
    }
   else
   {
      setTimeout(() => {
        this.loading.dismiss();
     });
     this.showPopup("Error", "Problem creating account.");
   }
}
},
error => {
 setTimeout(() => {
        this.loading.dismiss();
     });
 this.showPopup("Error", error);
});
}


showLoading() {
  this.loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  this.loading.present();
}

showPopup(title, text) {
  let alert = this.alertCtrl.create({
    title: title,
    subTitle: text,
    buttons: [
     {
       text: 'OK',
       handler: data => {
         if (this.createSuccess) {
           this.navCtrl.popToRoot();
         }
       }
     }
   ]
  });
  alert.present();
}


}
