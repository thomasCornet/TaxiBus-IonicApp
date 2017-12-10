import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-prix',
  templateUrl: 'prix.html'
})

export class PrixPage {
  trajets;
  constructor(public navCtrl: NavController) {
    var trajets=
    [
      { image:"direction.png",
        titre:"Même secteur",
        description:"Aller simple dans un même secteur. ",
        prix:"4,40$"
      },
      { image:"moinsCinq.png",
        titre:"5Km et moins",
        description:"Aller simple changement de secteur de 5 Km et moins. ",
        prix:"4,40$"
      },
      { image:"plusCinq.png",
        titre:"5Km et plus",
        description:"Aller simple changement de secteur 5 Km et plus.",
        prix:"5,75$"
      },
      { image:"plusDix.png",
        titre:"10Km et plus",
        description:"Aller simple changement de secteur 10 Km et plus. ",
        prix:"6,75$"
      },
      { image:"abo.png",
        titre:"Laissez-passer mensuel",
        description:"Ce laissez-passer est valide du 1er jour du mois en vigueur jusqu'au dernier jour du même mois. Peu importe le moment de l'achat du laissez-passé, ce dernier expire la dernière journée de chaque mois. Celui-ci vous permet d'utiliser le taxibus de façons illimité durant le mois.",
        prix:"104,00$"
      },
      { image:"free.png",
        titre:"Enfant",
        description:"Enfant de 1 à 12 ans accompagné  ",
        prix:"GRATUIT"
    }
    ];
    this.trajets=trajets;
  
  }

}
