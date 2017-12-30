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
import { ModalPage } from '../pages/profil/ModalPage/modal';
import { ModalPageLogin } from '../pages/login/ModalPage/modalLogin';
import {MapsPage} from '../pages/home/maps/maps';
import {LoginPage} from '../pages/login/login';
import {ReserverPage} from '../pages/home/reserver/reserver';
import {InformationPage} from '../pages/home/information/information';
import {PicturePage} from '../pages/profil/ModalPicturePage/modal-picture';
import {PlaintePage}from '../pages/profil/Plainte/plainte';
//googleMap
import {GoogleMaps} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

//api
import {UserApiService} from '../services/userapi.service';
import {HttpModule} from '@angular/http';


//new api
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
//image picker
import { PhotoLibrary } from '@ionic-native/photo-library';

//send Emails
import { EmailComposer } from '@ionic-native/email-composer';

//storage native
import { NativeStorage } from '@ionic-native/native-storage';

//SMS verification
import { SMS } from '@ionic-native/sms';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HorairePage,
    PrixPage,
    ProfilPage,
    TabsPage,
    PicturePage,
    ModalPage,
    ModalPageLogin,
    MapsPage,
    LoginPage,
    PlaintePage,
    ReserverPage,
    InformationPage
  ],
  imports: [
    HttpClientModule,
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
    ModalPageLogin,
    PicturePage,
    TabsPage,
    ModalPage,
    MapsPage,
    LoginPage,
    PlaintePage,
    ReserverPage,
    InformationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    EmailComposer,
    NativeStorage,
    PhotoLibrary,
    LocationAccuracy,
    SMS,
    UserApiService,
    HTTP,
    
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
