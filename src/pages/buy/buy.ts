import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
    selector: 'page-buy',
    templateUrl: 'buy.html',
})
export class BuyPage {

    itemsBuy: Observable<any[]>;
    items: Observable<any[]>;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private angularFireAuth: AngularFireAuth,
        private angularFireDatabase: AngularFireDatabase,
        public alertCtrl: AlertController) {

        this.angularFireAuth.authState.take(1).subscribe(data => {
                this.itemsBuy = this.angularFireDatabase.list(`buymenu/${data.uid}`)
                    .snapshotChanges()
                    .map(caches => {
                        return caches.map(c => ({
                            key: c.payload.key, ...c.payload.val()
                        }));
                    });
            });
    }

    ionViewDidLoad() {
        console.log(this.itemsBuy);
        console.log('ionViewDidLoad BuyPage');
    }

    delete(item) {
        let alert = this.alertCtrl.create({
            title: "Delete",
            message: "คุณแน่ใจหรือไม่ที่ต้องการลบเมนูอาหาร",
            buttons: [
                {
                    text: "ยกเลิก",
                    role: "cancel",
                    handler: () => { }
                },
                {
                    text: "ตกลง",
                    handler: () => {
                        console.log(item.key);
                        this.angularFireAuth.authState.take(1).subscribe(data => {
                            this.angularFireDatabase
                                .list(`buymenu/${data.uid}`)
                                .remove(item.key);
                        });
                    }
                }
            ]
        });
        alert.present();
    }

}
