import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, App } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

/**
 * Generated class for the NewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-new',
    templateUrl: 'new.html',
})
export class NewPage {

    items: Observable<any[]>;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private angularFireAuth: AngularFireAuth,
        private angularFireDatabase: AngularFireDatabase,
        public actionsheetCtrl: ActionSheetController,
        public appCtrl: App) {

        this.angularFireAuth.authState
            .take(1)
            .subscribe(data => {
                this.items = this.angularFireDatabase
                    .list(`restaurantID/${data.uid}`)
                    .snapshotChanges()
                    .map(caches => {
                        return caches.map(c => ({
                            key: c.payload.key, ...c.payload.val()
                        }));
                    });
            });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad NewPage');
    }

    editRest(item) {
        this.appCtrl
            .getRootNav()
            .push('EditRestaurantPage', { item: item }, { animate: true, direction: 'forward' });
    }

}
