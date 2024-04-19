import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter, withHashLocation } from "@angular/router";

import { routes } from './app.routes';
import { initializeApp } from "firebase/app";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


const firebaseConfig = {
  apiKey: "AIzaSyBngMXi5fQfq566yKmI4CTHiTLsXmpULXE",
  authDomain: "speed-14a95.firebaseapp.com",
  databaseURL: "https://speed-14a95-default-rtdb.firebaseio.com",
  projectId: "speed-14a95",
  storageBucket: "speed-14a95.appspot.com",
  messagingSenderId: "594339666510",
  appId: "1:594339666510:web:3ae2c1ae248036c641811f"
};

initializeApp(firebaseConfig)

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  importProvidersFrom(
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ), provideAnimationsAsync()]
};
