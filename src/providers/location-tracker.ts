import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';

//firebase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LocationTrackerServices {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;

  rutas: Observable<any[]>;
  rutasListRef: AngularFireList<any>;

  geoPuntos: any[] = [];

  constructor(
    public http: HttpClient,
    private backgroundGeolocation: BackgroundGeolocation,
    private geolocation: Geolocation,
    private fireDatabase: AngularFireDatabase
  ) {
    console.log('Hello LocationTrackerServices Provider');
    this.rutas = this.fireDatabase.list('/geoPuntos').valueChanges();
    this.rutasListRef = fireDatabase.list('/geoPuntos');
  }

  startTracking() {
    // Background Tracking
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      interval: 300000,
      debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    };

    this.backgroundGeolocation.configure(config)
    .subscribe((location) => {
      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
      this.backgroundGeolocation.finish();
    }, (err) => {
      console.log(err);
    });

    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();

    // Foreground Tracking
    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };

    // this.watch = this.geolocation.watchPosition(options)
    // .filter((p: any) => p.code === undefined)
    // .subscribe((position: Geoposition) => {
    //   console.log(position);
    //   // Run update inside of Angular's zone
    //   this.zone.run(() => {
    //     this.lat = position.coords.latitude;
    //     this.lng = position.coords.longitude;
    //     this.geoPuntos.push({
    //       latitude: this.lat,
    //       longitud: this.lng
    //     });
    //   });
    //   this.getAdd(this.geoPuntos);
    // });
  }

  stopTracking() {
     console.log('stopTracking');
     this.backgroundGeolocation.finish();
     // this.watch.unsubscribe();
  }

  getAdd(ruta) {
    console.log('ruta', ruta)
    this.rutasListRef.push(ruta);
  }

}
