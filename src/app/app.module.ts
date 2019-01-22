import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

// Firebase config
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { FIREBASE_CONFIG } from '../firebase/firebase-config';
import { Push } from '@ionic-native/push';





@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {
            mode: 'ios'
        }),
        AngularFireModule.initializeApp(FIREBASE_CONFIG),
        AngularFireAuthModule,
        AngularFireDatabaseModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,

    ],
    providers: [
        StatusBar,
        SplashScreen,
        Push,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        ScreenOrientation
    ]
})
export class AppModule { }
