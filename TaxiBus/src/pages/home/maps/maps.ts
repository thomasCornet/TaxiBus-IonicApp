import { Component } from '@angular/core';
import { NavController, Platform,Keyboard } from 'ionic-angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import {GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeStorage } from '@ionic-native/native-storage';
import {UserApiMap}from '../../../models/user.api.map';
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html'
})

export class MapsPage {
  private map: GoogleMap;
  private trees=[];
  private lat: number;
  private lng: number;
  private lati:number;
  private choix:string;
  private nom: string = '';
  private items: string[];
  private valeur:string='';
  private zone = [
    {lat:-74.137845,lng:45.2562199},
    {lat:-74.1263866,lng:45.2426088},
    {lat:-74.121151,lng:45.244739},
    {lat:-74.1247559,lng:45.2489993},
    {lat:-74.1230178,lng:45.2509481},
    {lat:-74.1219234,lng:45.2511142},
    {lat:-74.122417,lng:45.2516429},
    {lat:-74.1244125,lng:45.251507},
    {lat:-74.1282749,lng:45.2561897},
    {lat:-74.1280603,lng:45.2567788},
    {lat:-74.1280603,lng:45.2573527},
    {lat:-74.129777,lng:45.2572319},
    {lat:-74.1299057,lng:45.2565371},
    {lat:-74.137845,lng:45.2562199},

  ];

  constructor(private nativeStorage: NativeStorage,public navCtrl: NavController,private locationAccuracy: LocationAccuracy, private googleMaps: GoogleMaps,public platform: Platform  ,public keyboard: Keyboard,private geolocation: Geolocation) {
  
    platform.ready().then(() =>{
      nativeStorage.getItem('trees')
      .then(
        tree =>{
          this.trees=tree.tree;
         }
      );
      
      console.log(this.trees);
      
      //demande d'activation localisation
      this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        
          if(canRequest) {
            // the accuracy option will be ignored by iOS
            this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
              () => this.maPos(),
              error => console.log('Erreur de localisation', error)
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
    

    private addMarkerOnMap(tree: UserApiMap){

      this.map.addMarker({       
        title: tree.nom,
        snippet:"Numéro de l'arrêt: "+tree.numero+", Secteur: "+tree.secteur,
        icon: 'red',
        animation: 'DROP',
        position: {
          lat: tree.latitude,
          lng: tree.longitude
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
  


