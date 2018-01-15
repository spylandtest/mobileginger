import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpModule  } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AddconsumerPage } from '../pages/addconsumer/addconsumer';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AddconsumerserviceProvider } from '../providers/addconsumerservice/addconsumerservice';
import { FilterserviceProvider } from '../providers/filterservice/filterservice';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder} from '@ionic-native/native-geocoder';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Device } from '@ionic-native/device';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { DevicecheckserviceProvider } from '../providers/devicecheckservice/devicecheckservice';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AddconsumerPage
  ],
  imports: [
    
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AddconsumerPage
  ],
  providers: [
    StatusBar,
    HttpModule,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AddconsumerserviceProvider,
    FilterserviceProvider,
    ConnectivityServiceProvider,
    Geolocation,
    NativeGeocoder,
    LocationAccuracy,
    Device,
    UniqueDeviceID,
    DevicecheckserviceProvider,
  ]
})
export class AppModule {}
