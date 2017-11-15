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

//googleMap
import {GoogleMaps} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

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
    ModifierPage
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
    ModifierPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    UserApiService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
