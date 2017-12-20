import { Component } from '@angular/core';
import { NavController, Platform,Keyboard } from 'ionic-angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
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
  private zone = [
    {lat: 41.79883, lng: 140.75675},
    {lat: 41.799240000000005, lng: 140.75875000000002},
    {lat: 41.797650000000004, lng: 140.75905},
    {lat: 41.79637, lng: 140.76018000000002},
    {lat: 41.79567, lng: 140.75845},
    {lat: 41.794470000000004, lng: 140.75714000000002},
    {lat: 41.795010000000005, lng: 140.75611},
    {lat: 41.79477000000001, lng: 140.75484},
    {lat: 41.79576, lng: 140.75475},
    {lat: 41.796150000000004, lng: 140.75364000000002},
    {lat: 41.79744, lng: 140.75454000000002},
    {lat: 41.79909000000001, lng: 140.75465},
    {lat: 41.79883, lng: 140.75673}
  ];

  constructor(public navCtrl: NavController,private locationAccuracy: LocationAccuracy, private googleMaps: GoogleMaps,public platform: Platform  ,public keyboard: Keyboard,private geolocation: Geolocation) {
   
    
    this.trees=TreeMapping.TreeMappingList;
    console.log(this.trees);
    platform.ready().then(() =>{
      
      //demande d'activation localisation
      this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        
          if(canRequest) {
            // the accuracy option will be ignored by iOS
            this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
              () => this.maPos(),
              error => console.log('Error requesting location permissions', error)
            );
          }
      });        
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
              
            this.map.addPolygon( {
            'points': this.zone,
            'strokeColor' : '#AA00FF',
            'strokeWidth': 5,
            'fillColor' : '#880000'
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
  


