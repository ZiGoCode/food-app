import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, App } from "ionic-angular";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  images: ImagsHome[] = [
    { image: "../../assets/imgs/restaurants/restaurant10.jpg" },
    { image: "../../assets/imgs/restaurants/restaurant07.jpg" },
    { image: "../../assets/imgs/restaurants/restaurant06.jpg" },
    { image: "../../assets/imgs/restaurants/restaurant05.jpg" },
    { image: "../../assets/imgs/restaurants/restaurant08.jpg" }
  ];

  imagesi: ImagsHomeSi[] = [
    { image: "../../assets/imgs/restaurants/restaurant07sq.jpg" },
    { image: "../../assets/imgs/restaurants/restaurant08sq.jpg" },
    { image: "../../assets/imgs/restaurants/restaurant05sq.jpg" },
    { image: "../../assets/imgs/restaurants/restaurant06sq.jpg" },
    { image: "../../assets/imgs/restaurants/restaurant04sq.jpg" },
    { image: "../../assets/imgs/restaurants/restaurant10sq.jpg" },
    { image: "../../assets/imgs/restaurants/restaurant09sq.jpg" },
    { image: "../../assets/imgs/restaurants/restaurant12sq.jpg" }
  ];

  items: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private angularFireDatabase: AngularFireDatabase,
    public appCtrl: App
  ) {

    this.items = this.angularFireDatabase.list(`restaurant`)
      .snapshotChanges()
      .map(caches => {
        return caches.map(c => ({
          key: c.payload.key,
          ...c.payload.val()
        }));
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad HomePage");
    console.log(this.items);

  }

  dishPage(item) {
    this.appCtrl
      .getRootNav()
      .push("DishPage", { item: item, dishKey: item.key}, { animate: true, direction: "forward" });
  }
}

export interface ImagsHome {
  image: string;
}
export interface ImagsHomeSi {
  image: string;
}
