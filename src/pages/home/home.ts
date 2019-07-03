import { Component } from '@angular/core';
import { NavController,LoadingController  } from 'ionic-angular';
import { PhotographyProvider } from '../../providers/photography/photography';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageviewerPage } from '../imageviewer/imageviewer';
import { NativeStorage } from '@ionic-native/native-storage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: Array<any>;
  public liked: any;
  public userid: string;
  public loadimages: any;
  constructor(public loadingCtrl: LoadingController,public NativeStorage:NativeStorage,public navCtrl: NavController,public PhotographyProvider:PhotographyProvider,public DomSanitizer:DomSanitizer) {
    this.items=[];
    this.liked=false;
    this.loadimages=false;
  }
  goTo(id) {
   this.navCtrl.push(ImageviewerPage, {
     data: id
   });
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.ionViewDidLoad();
    refresher.complete();
  }
  getSantizeUrl(url : string) {
      return this.DomSanitizer.bypassSecurityTrustUrl(url);
  }

    ionViewDidLoad() {
      this.items=[];
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present()
      this.NativeStorage.getItem('Userid').then(val => {
          this.userid=val;
          });
        this.PhotographyProvider.display().subscribe(results => {
          var publications=results.videoinfo;
          console.log(publications[1]);
          loading.dismiss();
          for (let i = 0; i < publications.length; i++) {
            this.items.push(publications[i]);
            this.loadimages=true;

          }
        });
    }

}
