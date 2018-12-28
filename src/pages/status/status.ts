import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {

  tomorrow: any;
  datenum = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.tomorrow = new Date().toLocaleString();
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusPage');
  }

}
