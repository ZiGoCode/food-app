import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Restaurant } from "../../firebase/restaurant";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs";

@IonicPage()
@Component({
    selector: "page-dish",
    templateUrl: "dish.html"
})
export class DishPage {

    restaurant = {} as Restaurant;
    dishKey: any;
    images: ImagsHome[] = [
        { image: '../../assets/imgs/restaurants/restaurant10.jpg' },
        { image: '../../assets/imgs/restaurants/restaurant07.jpg' },
        { image: '../../assets/imgs/restaurants/restaurant06.jpg' },
        { image: '../../assets/imgs/restaurants/restaurant05.jpg' },
        { image: '../../assets/imgs/restaurants/restaurant08.jpg' },
    ];
    dishMenu: Observable<any[]>;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private angularFireDatabase: AngularFireDatabase
    ) {

        this.restaurant = this.navParams.get("item");
        this.dishKey = this.navParams.get("dishKey")

        this.dishMenu = this.angularFireDatabase.list(`restaurant/${this.dishKey}/dish`)
            .snapshotChanges()
            .map(caches => {
                return caches.map(c => ({
                    key: c.payload.key,
                    ...c.payload.val()
                }));
            });
    }

    ionViewDidLoad() {
        console.log("ionViewDidLoad DishPage");
    }
    onDish(item) {
        this.navCtrl.push('DishMenuPage', { item: item });
    }
    onCart() {
        this.navCtrl.push('BuyPage')
    }
}

export interface ImagsHome {
    image: string;
}
