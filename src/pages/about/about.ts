import { Component } from '@angular/core';
import { NavController , NavParams } from 'ionic-angular';
import { ModifyPage }from '../Modify/Modify';
import { RequestsProvider } from '../../providers/requests/requests';
import { NativeStorage } from '@ionic-native/native-storage';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera,CameraOptions  } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadPage }from '../upload/upload';
import { ImageviewerPage } from '../imageviewer/imageviewer';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';
declare var cordova: any;
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  pushPage: any;
  secondpush:any;
  private name: String;
  private email: String;
  private password: String;
  private biography: String;
  private imgplaceholder :string;
  private userpostid : String;
  items: Array<any>;
  public image: any;
  constructor( private app: App,public camera: Camera, private DomSanitizer: DomSanitizer,public navCtrl: NavController,public NativeStorage:NativeStorage, public navParams: NavParams, public RequestsProvider: RequestsProvider) {
      this.pushPage= ModifyPage;
      this.secondpush=UploadPage;
      this.name="Loading...";
      this.email="Loading...";
      this.biography="Loading...";
      this.imgplaceholder="../../../assets/imgs/Webalys-Kameleon.pics-Coding-Html.ico"
      this.items=[];
  }
    goTo(id) {
     this.navCtrl.push(ImageviewerPage, {
       data: id
     });
    }
    getPhoto(){
       this.takePicture();
    }
    logoff(){
      this.app.getRootNav().setRoot(LoginPage);
      this.NativeStorage.clear();
    }
    public takePicture() {
      // Create options for the Camera Dialog
      var options:CameraOptions = {
        quality: 40,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };
      // Get the data of an image
      this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,'+imageData;
      //let sanitizedUrl  = this.DomSanitizer.bypassSecurityTrustResourceUrl(base64Image);
      this.imgplaceholder = base64Image;
      }, (err) => {
        console.log('ERROR -> ' + JSON.stringify(Error));
   // Handle error
      });
    }


    getSantizeUrl(url : string) {
        return this.DomSanitizer.bypassSecurityTrustUrl(url);
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad LoginPage');
      this.NativeStorage.getItem('Userid').then(data => {
        this.RequestsProvider.searchinfo(data).subscribe(results => {
          /*existinguser.put("name",name);
			    existinguser.put("email",email);
			    existinguser.put("password",pasword);
			    existinguser.put("biography",bio)*/
            console.log(data);
            this.email=results.userinfo.email;
            this.NativeStorage.setItem('Email',results.userinfo.email);
            this.name=results.name;
            this.NativeStorage.setItem('name',results.userinfo.name);
            this.biography=results.userinfo.biography;
            this.NativeStorage.setItem('biography',this.biography);
            this.NativeStorage.setItem('password',results.userinfo.password);
            var publications=results.image;
            console.log(publications);
            console.log(publications[0].photo);
            for (let i = 0; i < publications.length; i++) {
              if (publications[0].photo==undefined){
                console.log("not image found")
              }else{
                this.image=true;
                this.items.push(publications[i]);
                this.userpostid=publications[i].userid;
                console.log(publications[i]);
                console.log(this.userpostid);
              }
            }
        console.log("loaded");}
        )},
          error => console.error("Error storing item", error)
        );
    }
}
