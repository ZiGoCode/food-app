import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

/**
 * Generated class for the RestaurantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-restaurant',
  templateUrl: 'restaurant.html',
})
export class RestaurantPage {

  items: Observable<any[]>;

  constructor(private angularFireDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams,private appCtrl: App) {

    this.items = this.angularFireDatabase.list(`restaurant`).valueChanges();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantPage');
  }

  dishPage(){
    this.appCtrl.getRootNav().push('DishPage', { }, { animate: true, direction: 'forward' });
  }

}
