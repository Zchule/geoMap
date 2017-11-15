import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LocationTrackerServices } from '../../providers/location-tracker';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public locationTracker: LocationTrackerServices
  ) {

  }

  start(){
    this.locationTracker.startTracking();
  }
 
  stop(){
    this.locationTracker.stopTracking();
  }

}
