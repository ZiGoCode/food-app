import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

import { ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-buy',
    templateUrl: 'buy.html',
})
export class BuyPage {
    @ViewChild(Content) content: Content;

    itemsBuy: Observable<any[]>;
    baht = 0;
    buyBaht: any;
    numbers = new Array();
    element = 0;
    keyTeble: any;
    heroes = ['AB01', 'AB02', 'AB03', 'AB04'];
    dis: any;
    dishBaht: any;
    numberdis: number;
    bass: number;




    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private angularFireAuth: AngularFireAuth,
        private angularFireDatabase: AngularFireDatabase,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController) {

        this.angularFireAuth.authState.take(1).subscribe(data => {
            this.itemsBuy = this.angularFireDatabase.list(`buymenu/${data.uid}`)
                .snapshotChanges()
                .map(caches => {
                    return caches.map(c => ({
                        key: c.payload.key, ...c.payload.val()
                    }));
                });
        });
        this.getBaht();
    }


    ionViewDidLoad() {
        // console.log(this.dis);
    }

    getBaht() {
        this.angularFireAuth.authState.take(1).subscribe(data => {
            this.angularFireDatabase.list(`buymenu/${data.uid}`).valueChanges()
                .subscribe(res => {
                    this.bass = res.length;
                    for (let i = 0; i < res.length; i++) {
                        this.dis = (res[i]);
                        this.dishBaht = JSON.stringify(this.dis.price);
                        this.numberdis = Number(this.dishBaht);
                        console.log(this.numberdis);
                        this.numbers.push(this.numberdis)
                        console.log(this.numbers);
                    }
                    for (let i = 0; i < this.numbers.length; i++) {
                        this.element += this.numbers[i];
                        console.log(this.element);
                    }
                })
        });
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
                        const loader = this.loadingCtrl.create({
                            content: "Please wait...",
                            spinner: 'crescent',
                        });
                        loader.present();
                        this.angularFireAuth.authState.take(1).subscribe(data => {
                            this.angularFireDatabase
                                .list(`buymenu/${data.uid}`)
                                .remove(item.key);
                            this.numbers.length = 0;
                            this.element = 0;
                        });
                        loader.dismiss();
                    }
                }
            ]
        });
        alert.present();
    }
    
    showRadio() {
        let alert = this.alertCtrl.create();
        alert.setTitle('รหัสโต๊ะ');

        for (let i = 0; i < this.heroes.length; i++) {
            alert.addInput(
                {
                    type: 'radio',
                    label: this.heroes[i],
                    value: this.heroes[i],
                    checked: false,
                }
            );
        }

        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: data => {
                // console.log('Checkbox data:', data);
                this.keyTeble = false;
                this.keyTeble = data;
            }
        });
        alert.present();
    }
    onBuy() {
        if (this.bass == 0) {
            const alert = this.alertCtrl.create({
                title: 'แจ้งเตือน!',
                subTitle: 'กรุณาเลือกเมนูอาหารก่อน',
                buttons: ['OK']
            });
            alert.present();
        }
        else if (!this.keyTeble) {
            const alert = this.alertCtrl.create({
                title: 'แจ้งเตือน!',
                subTitle: 'กรุณาเลือกโต๊ะอาหาร',
                buttons: ['OK']
            });
            alert.present();
        } else {

            let alert = this.alertCtrl.create();
            alert.setTitle('Pay with');

            alert.addInput({
                type: 'radio',
                label: 'จ่ายด้วยเงินสด',
                value: 'blue1',
                checked: true
            });
            alert.addInput({
                type: 'radio',
                label: 'จ่ายด้วยบัตรเครดิต',
                value: 'blue2',
                checked: false
            });
            alert.addButton({
                text: 'OK',
                handler: data => {
                    const loader = this.loadingCtrl.create({
                        content: "Please wait...",
                        spinner: 'crescent',
                    });
                    loader.present();

                    if (data == 'blue1') {
        
                        this.navCtrl.push('MyOrdersPage', {item: 1});
                    }
                    if (data == 'blue2') {
                        
                        this.navCtrl.push('CheckoutPage');
                    }
                    loader.dismiss();
                }
                
            });
            alert.present();
        }
    }
}
