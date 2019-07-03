import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { PhotographyProvider } from '../../providers/photography/photography';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageviewerPage } from '../imageviewer/imageviewer';
import { NativeStorage } from '@ionic-native/native-storage';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  items: Array<any>;
  public userid: string;
  public loadimages: any;
  constructor(public loadingCtrl: LoadingController,public NativeStorage:NativeStorage,public navCtrl: NavController,public PhotographyProvider:PhotographyProvider,public DomSanitizer:DomSanitizer) {
    this.items=[];
    this.loadimages=false;
  }

  goTo(id) {
   this.navCtrl.push(ImageviewerPage, {
     data: id
   });
  }
  getSantizeUrl(url : string) {
      return this.DomSanitizer.bypassSecurityTrustUrl(url);
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.ionViewDidLoad();
    refresher.complete();
  }
  ionViewDidLoad() {
    this.items=[];
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present()
    this.NativeStorage.getItem('Userid').then(val => {
        this.userid=val;
        let data ={
          id:this.userid,
        }
        this.PhotographyProvider.displaylikes(data).subscribe(results => {
          console.log(results);
          var publications=results.videoinfo;
          console.log(publications[1]);
          loading.dismiss();
          for (let i = 0; i < publications.length; i++) {
            this.items.push(publications[i]);
            this.loadimages=true;
          }
        });
        });

  }

}
