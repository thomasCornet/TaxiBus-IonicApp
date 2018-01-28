import { Component } from '@angular/core';
import {LoadingController, NavController, ToastController,Platform,Keyboard } from 'ionic-angular';
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
  private loading:any;
  private nom: string = '';
  private items: string[];
  private valeur:string='';
 

  constructor(private toastCtrl: ToastController,public loadingCtrl: LoadingController,private nativeStorage: NativeStorage,public navCtrl: NavController,private locationAccuracy: LocationAccuracy, private googleMaps: GoogleMaps,public platform: Platform  ,public keyboard: Keyboard,private geolocation: Geolocation) {
  
    platform.ready().then(() =>{
      nativeStorage.getItem('trees')
      .then(
        tree =>{
          this.trees=tree.tree;
         }
      )
       this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
              () => 
                    this.maPos()
            )
          
            
    });

    this.items=new Array(this.trees.length);

    if(this.valeur.trim()==''){
      this.items=this.items.filter((item)=>{
        return (item.toLowerCase().indexOf(this.valeur.toLowerCase())>0);
      })
    }
      
  }
  presentToast(test:string) {
    let toast = this.toastCtrl.create({
      message: test,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Toast Visualisé ! ');
    });
  
    toast.present();
  }

  maPos(){
    this.presentLoadingCustom("Chargement de la carte...")
    this.geolocation.getCurrentPosition().then((pos) => {
      this.loading.dismiss();
      this.loadMap(pos.coords.latitude,pos.coords.longitude);
    },
    (err)=>{
      this.presentToast("erreur maPos()")
    }
  )};

  loadMap(lat:number,lng:number) {
    
    

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
          },
          (err)=>{
            
          });
      }
    

    private addMarkerOnMap(tree: UserApiMap){

      this.map.addMarker({       
        title: tree.nom,
        snippet:"Secteur: "+tree.secteur,
        icon: 'red',
        animation: 'DROP',
        position: {
          lat: tree.latitude,
          lng: tree.longitude
        }

      });

    }

  
   /* initialisationItems(){
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
      
     
    }*/

    zoom(lat:number,lng:number){
      console.log(lat,lng);
      this.map.setCameraTarget({
        lat: lat, 
        lng:lng,
        
      });
      this.map.setCameraZoom(19);
     
    }
    
    presentLoadingCustom(message:string) {
      this.loading = this.loadingCtrl.create({
        content:message
      });
    
      this.loading.present();

     
    }


    fermerClavier(){
     this.keyboard.close();
    }

}
  


