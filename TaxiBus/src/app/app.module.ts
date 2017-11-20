import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//pages
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { HorairePage } from '../pages/horaire/horaire';
import { PrixPage } from '../pages/prix/prix';
import { ProfilPage } from '../pages/profil/profil';
import {MapsPage} from '../pages/home/maps/maps';
import {ModifierPage} from '../pages/profil/modifier/modifier';
import {LoginPage} from '../pages/login/login';
import {ReserverPage} from '../pages/home/reserver/reserver';

//googleMap
import {GoogleMaps} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
//api
import {UserApiService} from '../services/userapi.service';
import {HttpModule} from '@angular/http';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HorairePage,
    PrixPage,
    ProfilPage,
    TabsPage,
    MapsPage,
    ModifierPage,
    LoginPage,
    ReserverPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HorairePage,
    PrixPage,
    ProfilPage,
    TabsPage,
    MapsPage,
    ModifierPage,
    LoginPage,
    ReserverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    LocationAccuracy,
    UserApiService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
