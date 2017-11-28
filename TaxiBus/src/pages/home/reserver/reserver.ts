import { Component } from '@angular/core';
import { NavController, Platform,Keyboard } from 'ionic-angular';
import * as TreeMapping from '../../../models/tree.mapping';

@Component({
    selector: 'page-reserver',
    templateUrl: 'reserver.html'
  })
  
  export class ReserverPage {

    private trees: TreeMapping.Treemap[];
    private items: string[];
    private itemsB: string[];
    private valeur:string='';
    private choixA: string;
    private choixB: string;
    
    constructor(public navCtrl: NavController, public platform: Platform  ,public keyboard: Keyboard) {

      this.trees=TreeMapping.TreeMappingList;

      //Départ
      this.items=new Array(this.trees.length);
    
      if(this.valeur.trim()==''){
        this.items=this.items.filter((item)=>{
          return (item.toLowerCase().indexOf(this.valeur.toLowerCase())>0);
        })
      }

      //Arrivée
      this.itemsB=new Array(this.trees.length);

      if(this.valeur.trim()==''){
        this.itemsB=this.itemsB.filter((item)=>{
          return (item.toLowerCase().indexOf(this.valeur.toLowerCase())>0);
        })
      }

    }

    showHome(){
      this.navCtrl.pop(); 
    }

    initialisationItems(){
      for(var i=0;i<this.trees.length;++i){
        this.items[i]=this.trees[i].name;
      }
    }

    //Lieu de départ

    rechercheInTree(ev:any){
      let val=ev.target.value;
      this.initialisationItems();
      
      if(val && val.trim()!=''){
        this.items=this.items.filter((item)=>{
        return (item.toLowerCase().indexOf(val.toLowerCase())>-1);
       })

      }

    }
    choixVille(item: string){
      this.choixA=item;
      this.keyboard.close();
      if(this.choixA && this.choixA.trim()!=''){
        this.items=this.items.filter((item)=>{
          return (item.toLowerCase().indexOf(this.choixA.toLowerCase())>0);
        })
      }
    }

    //Lieu d'arrivée

    initialisationItemsB(){
      for(var i=0;i<this.trees.length;++i){
        this.itemsB[i]=this.trees[i].name;
      }
    }

   rechercheInTreeB(ev:any){
      let val=ev.target.value;
      this.initialisationItemsB();
      
      if(val && val.trim()!=''){
        this.itemsB=this.itemsB.filter((item)=>{
        return (item.toLowerCase().indexOf(val.toLowerCase())>-1);
       })

      }

    }
    choixVilleB(item: string){
      this.choixB=item;
      this.keyboard.close();
      if(this.choixB && this.choixB.trim()!=''){
        this.itemsB=this.itemsB.filter((item)=>{
          return (item.toLowerCase().indexOf(this.choixB.toLowerCase())>0);
        })
      }
    }


  }  