import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';


@IonicPage()
@Component({
    selector: 'page-saved',
    templateUrl: 'saved.html',
})
export class SavedPage {

    save: Observable<any[]>;
    bass: number;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private angularFireAuth: AngularFireAuth,
        private angularFireDatabase: AngularFireDatabase
    ) {

        this.angularFireAuth.authState.take(1).subscribe(data => {
            this.save = this.angularFireDatabase.list(`save/${data.uid}`)
                .snapshotChanges()
                .map(caches => {
                    return caches.map(c => ({
                        key: c.payload.key, ...c.payload.val()
                    }));
                });
        });
        this.getBaht();



    }

    getBaht() {
        this.angularFireAuth.authState.take(1).subscribe(data => {
            this.angularFireDatabase.list(`save/${data.uid}`).valueChanges()
                .subscribe(res => {
                    this.bass = res.length;
                })
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SavedPage');
    }

}
