import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-my-orders',
    templateUrl: 'my-orders.html',
})
export class MyOrdersPage {

    itenbuttom: number = 0;


    constructor(public navCtrl: NavController, public navParams: NavParams) {

        if (this.navParams.get("item")) {
            this.itenbuttom = this.navParams.get("item");
        }



    }
    // formatDate() {
    //    const date1 = new Date();
    //    const date = date1.getDate();
    //    const year = date1.getFullYear();
    //    const month = date1.getMonth();
    //     return ``
    // }
    ionViewDidLoad() {
        console.log('ionViewDidLoad MyOrdersPage');
        console.log(this.ranbom(0, 1000000));
    
    }

    onTabpage() {
        this.navCtrl.setRoot('TabsPage');
    }

    ranbom(min_val, max_val) {
        return Math.floor(Math.random() * Math.floor(max_val - min_val + 1)) + min_val;
    }

}
