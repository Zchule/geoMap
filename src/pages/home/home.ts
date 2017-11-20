import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LocationTrackerServices } from '../../providers/location-tracker';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  rutas: any[] = [];

  constructor(
    public navCtrl: NavController,
    public locationTracker: LocationTrackerServices
  ) {

  }

  ionViewDidLoad(){
    //this.locationTracker.seedData();
  }

  start(){
    setInterval(() => {
      this.locationTracker.startTracking();
    }, 5000);

  }

  stop(){
    this.locationTracker.stopTracking();
  }


}
