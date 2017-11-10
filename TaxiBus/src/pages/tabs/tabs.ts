import { Component } from '@angular/core';

import {HomePage} from "../home/home";
import {HorairePage} from "../horaire/horaire";
import {PrixPage} from "../prix/prix";
import {ProfilPage} from "../profil/profil";

@Component({
    templateUrl: 'tabs.html'
  })
  export class TabsPage {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    tab1Root = HomePage;
    tab2Root = HorairePage;
    tab3Root = PrixPage;
    tab4Root = ProfilPage;
    constructor() {
  
    }
  }