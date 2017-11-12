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
  public map: GoogleMap;
  private trees: TreeMapping.Treemap[];
  public debut: string;
  public fin: string;
  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, public platform: Platform  ,private geolocation: Geolocation) {
    
    this.trees=TreeMapping.TreeMappingList;
    console.log(this.trees);

    platform.ready().then(() =>{
          this.loadMap();         
      });
  }



  loadMap() {
    this.geolocation.getCurrentPosition().then((pos) => {
   
        let mapOptions: GoogleMapOptions = {
          camera: {
            target: {
              lat:pos.coords.latitude,
              lng: pos.coords.longitude
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
                  lat: pos.coords.latitude,
                  lng: pos.coords.longitude
                }
              });
              
    
          });
      }
    )};

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
    


}
