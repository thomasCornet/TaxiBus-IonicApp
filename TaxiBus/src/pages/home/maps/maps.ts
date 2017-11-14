import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

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
  //choix:string;
  private nom: string = '';
  private items: string[];


  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, public platform: Platform  ,private geolocation: Geolocation) {
    
    this.trees=TreeMapping.TreeMappingList;
    
    console.log(this.trees);
    platform.ready().then(() =>{
          this.maPos();         
      });
    this.items=new Array(this.trees.length);
      
  }


  maPos(){
    this.geolocation.getCurrentPosition().then((pos) => {
      this.loadMap(pos.coords.latitude,pos.coords.longitude);
    }
  )};

  loadMap(lat:number,lng:number) {
   
   
        let mapOptions: GoogleMapOptions = {
          camera: {
            target: {
              lat:lat,
              lng:lng
            },
            zoom: 18,
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
    onInput(ev:any){
      let val=ev.target.value;
      this.initialisationItems();
      
    if(val && val.trim()!=''){
       this.items=this.items.filter((item)=>{
         return (item.toLowerCase().indexOf(val.toLowerCase())>-1);
       })
     }
     
     

    }
    
    choixItem(item: Object){
      console.log(item);
    }
}
