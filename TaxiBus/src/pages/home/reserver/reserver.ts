import { Component } from '@angular/core';
import { NavController, Platform,Keyboard } from 'ionic-angular';
import * as TreeMapping from '../../../models/tree.mapping';
@Component({
    selector: 'page-reserver',
    templateUrl: 'reserver.html'
  })
  
  export class ReserverPage {
    
    private map: GoogleMap;
    private trees: TreeMapping.Treemap[];
    private lat: number;
    private lng: number;
    private lati:number;
    private choixA:string;
    private choixB:string;
    private nom: string = '';
    private items: string[];
    private itemsB: string[];
    private valeur:string='';
    constructor(public navCtrl: NavController, public platform: Platform  ,public keyboard: Keyboard) {
      this.trees=TreeMapping.TreeMappingList;
      console.log(this.trees);
      this.items=new Array(this.trees.length);
      if(this.valeur.trim()==''){
        this.items=this.items.filter((item)=>{
          return (item.toLowerCase().indexOf(this.valeur.toLowerCase())>0);
        })
      }
    }
    showHome(){
      this.navCtrl.pop(); 
    }
    rechercheInTree(ev:any){
      let val=ev.target.value;
      this.initialisationItems();
      
      if(val && val.trim()!=''){
       this.items=this.items.filter((item)=>{
         return (item.toLowerCase().indexOf(val.toLowerCase())>-1);
       })

      }
    }
    initialisationItems(){
      for(var i=0;i<this.trees.length;++i){
        this.items[i]=this.trees[i].name;
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

      for(var i=0;i<this.trees.length;++i){
        if(this.trees[i].name==this.choixA){
          console.log(this.trees[i].name);
          break;
        }
      }
      
     
    }
    choixVille2(item: string){
      this.choixB=item;
      this.keyboard.close();
      if(this.choixB && this.choixB.trim()!=''){
        this.itemsB=this.items.filter((item)=>{
          return (item.toLowerCase().indexOf(this.choixB.toLowerCase())>0);
        })
      }

      for(var i=0;i<this.trees.length;++i){
        if(this.trees[i].name==this.choixB){
          console.log(this.trees[i].name);
          break;
        }
      }
      
     
    }


    
  }
  