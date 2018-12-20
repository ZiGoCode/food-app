import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

/**
 * Generated class for the MyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {

  profileData: Observable<any>;

  constructor(private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public appCtrl: App,
    public alertCtrl: AlertController) {

    this.angularFireAuth.authState.subscribe(data =>{
      this.profileData = this.angularFireDatabase.object(`user/${data.uid}`).valueChanges();
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }

  logout(){
    let alert = this.alertCtrl.create({
      title: 'ลงชื่อออก',
      message: 'คุณต้องการยืนลงชื่อออกจากระบบหรือไม่',
      buttons: [
          {
              text: 'ยกเลิก',
              role: 'cancel',
              handler: () => {
              }
          },
          {
              text: 'ตกลง',
              handler: () => {
                  // localStorage.removeItem('userData')
                  localStorage.removeItem('userData')
                  this.appCtrl.getRootNav().setRoot('LoginPage');
              }
          }
      ]
  })
  alert.present()
  }

  open(){
    this.appCtrl.getRootNav().push('TabsRtrPage',{},{animate: true, direction: 'back'});
  }

}
