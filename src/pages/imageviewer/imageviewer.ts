import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { PhotographyProvider } from '../../providers/photography/photography';
import { DomSanitizer } from '@angular/platform-browser';
import {Validators, FormBuilder, FormGroup} from '@angular/forms'
import {NativeStorage } from '@ionic-native/native-storage';
import { App } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { PhotoViewer } from '@ionic-native/photo-viewer';
/**
 * Generated class for the ImageviewerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-imageviewer',
  templateUrl: 'imageviewer.html',
})
export class ImageviewerPage {
  public userid:string;
  public id: string;
  public liked: any;
  public istherec: any;
  public userpostid:string;
  items: Array<any>;
  comments:Array<any>;
    private commentForm: FormGroup;
  constructor(private photoViewer: PhotoViewer,private app: App,public NativeStorage:NativeStorage,public fb: FormBuilder ,public DomSanitizer:DomSanitizer,public navCtrl: NavController,public PhotographyProvider:PhotographyProvider, public navParams: NavParams) {
     this.id = navParams.get('data');
     this.items=[];
     this.comments=[];
     this.commentForm =this.fb.group({
       comment: ['',Validators.required]
     });
     this.liked=false;
     this.istherec=false;
  }
  delete(){
    let data={
        idp:this.id,
        idu:this.userid,
        object:2
      };
    this.PhotographyProvider.delete(data).subscribe(results => {
      console.log(results);
      if (results.code==200){
      alert("Image Deleted");
      this.app.getRootNav().setRoot(TabsPage);
    }else{
      alert("Something went wrong")
    }
    });
  }
  getSantizeUrl(url : string) {
      return this.DomSanitizer.bypassSecurityTrustUrl(url);
  }
  showimage(image){
    this.photoViewer.show(image);
  }
  postcomment() {
    let data={
      id:this.id,
      userid:this.userid,
      comment:this.commentForm.value['comment']
    }
    console.log(data);
    this.PhotographyProvider.postcomment(data).subscribe(results => {
      this.commentForm.reset();
      this.comments=[];
      this.istherec=true;
      this.PhotographyProvider.viewcomment(this.id).subscribe(results => {
        for (let i = 0; i < results.length; i++) {
          this.comments.push(results[i]);
        }
      })
    });
  }
  deletecomment(id){
    console.log(id);
      let data={
          idp:id,
          idu:this.userid,
          object:3
        };
      this.PhotographyProvider.delete(data).subscribe(results => {
        console.log(results);
        if (results.code==200){
        alert("comment Deleted");
          for (let i = 0; i < this.comments.length; i++) {
            if(this.comments[i].commentid==id){
              console.log(this.comments[i])
              delete this.comments[i];
              if (typeof this.comments !== 'undefined' && this.comments.length > 0) {
                this.comments=[];
                this.istherec=false;
              }
            }
          }
      }else{
        alert("Something went wrong")
      }
      });
  }
  likedpost(postid,b){
    console.log("b= "+b);
    for (let i = 0; i < this.items.length; i++) {
        if(this.items[i].postid==postid){
        let amarillo=0;
          if (b==false){
            amarillo++;
            this.liked=true;
          let data={
              idpost:postid,
              userid:this.userid
            };
            this.PhotographyProvider.likepicture(data).subscribe(results => {
              console.log(data);
            });
          }else{
             amarillo--;
             this.liked=false;
             let data={
                 idp:postid,
                 idu:this.userid,
                 object:1
               };
               this.PhotographyProvider.delete(data).subscribe(results => {
                 console.log(results);
               });
          }
          this.items[i].liked=this.liked;
          this.items[i].count=this.items[i].count+amarillo;
        }
    }
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.ionViewDidLoad();
    refresher.complete();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageviewerPage');
    this.items=[];
    this.comments=[];
    this.NativeStorage.getItem('Userid').then(val => {
        this.userid=val;
        console.log(val);
        let data ={
          id:this.id,
          uid:this.userid
        }
    console.log(data);
    this.PhotographyProvider.displayv(data).subscribe(results => {
      var publications=results.videoinfo;
      console.log(publications);
      this.userpostid=publications.userid;
      console.log(this.userpostid);
      this.items.push(publications);
      this.PhotographyProvider.viewcomment(this.id).subscribe(results => {
        for (let i = 0; i < results.length; i++) {
          this.istherec=true;
          this.comments.push(results[i]);
        }
      });
    });


        });

  }


}
