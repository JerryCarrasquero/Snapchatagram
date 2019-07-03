import { Component } from '@angular/core';
import { NavController, NavParams,ActionSheetController,LoadingController } from 'ionic-angular';
import { Camera,CameraOptions  } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage';
import { PhotographyProvider } from '../../providers/photography/photography';
import { TabsPage } from '../tabs/tabs';
import { App } from 'ionic-angular';
/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {
  public imagecheck: string;
  private loginForm: FormGroup;
  private imgplaceholder :string;
  constructor(public loadingCtrl: LoadingController,public actionSheetCtrl: ActionSheetController,private app: App,public PhotographyProvider: PhotographyProvider ,public Storage : NativeStorage ,public camera: Camera, private DomSanitizer: DomSanitizer,public navCtrl: NavController,public fb: FormBuilder , public navParams: NavParams) {
    this.loginForm =this.fb.group({
      imagecheck:['',Validators.required],
      Description:['',Validators.required]
    });
    this.imagecheck="";
    this.imgplaceholder="../../../assets/imgs/Profile_avatar_placeholder_large.png"
  }


  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options:CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: sourceType,
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
    this.imagecheck="yes";
    }, (err) => {
      console.log('ERROR -> ' + JSON.stringify(Error));
 // Handle error
    });
  }
  getSantizeUrl(url : string) {
      return this.DomSanitizer.bypassSecurityTrustUrl(url);
  }

  uploadimg(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
     this.Storage.getItem('Userid').then( data => {
       console.log('Your userid is', data);
      const data1 ={
          id: data,
          descripcion: this.loginForm.value.Description,
          image:     this.imgplaceholder}
        this.PhotographyProvider.upload(data1).subscribe(results => {
          loading.dismiss();
          alert("Image Upload");
          this.app.getRootNav().setRoot(TabsPage);
        });
     });

   }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

}
