import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';

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

  constructor(
    public http: HttpClient,
    private backgroundGeolocation: BackgroundGeolocation,
    private geolocation: Geolocation,
    private fireDatabase: AngularFireDatabase,
    public zone: NgZone
  ) {
    console.log('Hello LocationTrackerServices Provider');
    this.rutasListRef = this.fireDatabase.list('trackingSupervisor/358993064450418/registro:11-20-2017/geoPuntoList/');
  }

  seedData() {
    let superUser = this.fireDatabase.object('/trackingSupervisor/358993064450418');
    superUser.set({
      PosicionActual:{
        hora: '232',
        latitude: '232',
        longitude: '2323',
      },
      'registro:11-20-2017': {
        fecha: '',
        geoPuntoList: [
          {
            hora: '1212',
            latitude: 'wewe',
            longitude: 'wewe',
          },
          {
            hora: '1212',
            latitude: 'wew',
            longitude: 'wewe',
          }
        ]
      }
    });
  }

  startTracking() {
    // Background Tracking
    // const config: BackgroundGeolocationConfig = {
    //   desiredAccuracy: 0,
    //   stationaryRadius: 0,
    //   distanceFilter: 0,
    //   interval: 5000,
    //   debug: true,
    //   stopOnTerminate: true,
    //   startForeground: true
    // };

    // this.backgroundGeolocation.configure(config)
    // .subscribe((location) => {
    //   console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
    //   console.log(new Date().toUTCString());

    //   // this.zone.run(() => {
    //   //   this.rutasListRef.push({
    //   //     latitude: location.latitude,
    //   //     longitud: location.longitude,
    //   //     time: ,
    //   //     type: 'BackgroundGeolocation'
    //   //   });
    //   // });


    // }, (err) => {
    //   console.log(err);
    // });

    let options = {
      frequency: 5000,
      enableHighAccuracy: true
    };

    this.watch = this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {

      console.log(position);
      const today = new Date();

      // Run update inside of Angular's zone

      this.rutasListRef.push({
        hora: `${today.getHours()}:${today.getMinutes()}:${today.getMinutes()}`,
        latitud: position.coords.latitude,
        longitud: position.coords.longitude,
      });

    });

    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();

  }

  stopTracking() {
     console.log('stopTracking');
     this.backgroundGeolocation.finish();
     this.watch.unsubscribe();
  }

}
