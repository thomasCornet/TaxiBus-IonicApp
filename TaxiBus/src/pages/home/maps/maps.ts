import { Component } from '@angular/core';
import { NavController, Platform,Keyboard } from 'ionic-angular';

import {GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import * as TreeMapping from '../../../models/tree.mapping';

@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html'
})

export class MapsPage {
  private map: GoogleMap;
  private trees: TreeMapping.Treemap[];
  private lat: number;
  private lng: number;
  private lati:number;
  private choix:string;
  private nom: string = '';
  private items: string[];
  private valeur:string='';
 

  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps,public platform: Platform  ,public keyboard: Keyboard,private geolocation: Geolocation) {
    
    
    this.trees=TreeMapping.TreeMappingList;
    console.log(this.trees);
    platform.ready().then(() =>{
          this.maPos();         
      });
    this.items=new Array(this.trees.length);

    if(this.valeur.trim()==''){
      this.items=this.items.filter((item)=>{
        return (item.toLowerCase().indexOf(this.valeur.toLowerCase())>0);
      })
    }
      
  }


  maPos(){
    this.geolocation.getCurrentPosition().then((pos) => {
      this.loadMap(pos.coords.latitude,pos.coords.longitude);
    }
  )};

  loadMap(lat:number,lng:number) {
   
    console.log("les coord ok:"+lat+"lng"+lng);

        let mapOptions: GoogleMapOptions = {
          
          camera: {
            target: {
              
              lat:lat,
              lng:lng
            },
            zoom: 19,
            tilt: 30
          }
          
        };
        
        this.map = GoogleMaps.create('map', mapOptions);
    
        
        this.map.one(GoogleMapsEvent.MAP_READY)
          .then(() => {
            console.log('Map is ready!');
            for(var tree of this.trees){
              this.addMarkerOnMap(tree);
            }
         
            this.map.addMarker({
                title: 'Ma position',
                icon: 'blue',
                animation: 'DROP',
                position: {
                  lat:lat,
                  lng: lng
                }
              });
              
    
          });
      }
    

    private addMarkerOnMap(tree: TreeMapping.Treemap){

      this.map.addMarker({       
        title: tree.name,
        snippet:"Numéro de l'arrêt: "+tree.numero,
        icon: 'red',
        animation: 'DROP',
        position: {
          lat: tree.lat,
          lng: tree.lng
        }

      });

    }

  
    initialisationItems(){
      for(var i=0;i<this.trees.length;++i){
        this.items[i]=this.trees[i].name;
      }
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
    
    choixVille(item: string){
      this.choix=item;
      this.keyboard.close();
      if(this.choix && this.choix.trim()!=''){
        this.items=this.items.filter((item)=>{
          return (item.toLowerCase().indexOf(this.choix.toLowerCase())>0);
        })
      }

      for(var i=0;i<this.trees.length;++i){
        if(this.trees[i].name==this.choix){
          this.zoom(this.trees[i].lat,this.trees[i].lng);
          break;
        }
      }
      
     
    }

    zoom(lat:number,lng:number){
      console.log(lat,lng);
      this.map.setCameraTarget({
        lat: lat, 
        lng:lng,
        
      });
      this.map.setCameraZoom(19);
     
    }
    



    fermerClavier(){
     this.keyboard.close();
    }

}
  


