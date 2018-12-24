import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Dish } from '../../firebase/dish';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Buy } from '../../firebase/buy';


@IonicPage()
@Component({
    selector: 'page-dish-menu',
    templateUrl: 'dish-menu.html',
})
export class DishMenuPage {

    buy = 1;
    cout: any;
    dishMenu = {} as Dish;
    baht: number;
    items: Observable<any[]>;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private toastCtrl: ToastController,
        private angularFireAuth: AngularFireAuth,
        private angularFireDatabase: AngularFireDatabase) {

        this.dishMenu = this.navParams.get("item");
        this.cout = this.dishMenu.price;
        this.baht = this.dishMenu.price;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DishMenuPage');
    }

    presentMenu(dishMenu: Dish) {
        let toast = this.toastCtrl.create({
            message: 'เพิ่มไปยังตะกร้าเมนูเรียบร้อยเเล้ว',
            duration: 3000,
            position: 'top'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });
        console.log(dishMenu);
        this.angularFireAuth.authState.take(1).subscribe(data => {
            dishMenu.price = this.cout
            const menu = {} as Buy;
            menu.title = this.dishMenu.title;
            menu.ingredients = this.dishMenu.ingredients;
            menu.type = this.dishMenu.type;
            menu.price = this.dishMenu.price;
            this.angularFireDatabase.list(`buymenu/${data.uid}`).push(menu).then(() => {
                toast.present();
            });
        });
    }


    onAdd() {
        this.buy++
        this.cout = this.buy * this.baht;
    }
    onRemove() {
        if (this.buy > 1) {
            this.buy--
            this.cout -= this.baht;
        }

    }
    onBuy() {
        this.navCtrl.push('BuyPage');
    }

}
