import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation'

import { LocationTrackerServices } from '../providers/location-tracker';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

const config = {
  apiKey: 'AIzaSyAJDgpY9ssAyjIX_vA7S1D_fgcA26BBvxQ',
  authDomain: 'svmmoviltest.firebaseapp.com',
  databaseURL: 'https://svmmoviltest.firebaseio.com',
  projectId: 'svmmoviltest',
  storageBucket: 'svmmoviltest.appspot.com',
  messagingSenderId: '1094384829553'
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp( config ),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    LocationTrackerServices,
    BackgroundGeolocation,
    Geolocation,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
