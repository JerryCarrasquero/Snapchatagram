import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms'
import { LoginPage } from '../login/login';
import { NativeStorage } from '@ionic-native/native-storage';
import { RequestsProvider } from '../../providers/requests/requests';

/**
 * Generated class for the RegisterdataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-registerdata',
  templateUrl: 'registerdata.html',
})
export class RegisterdataPage {
  private loginForm: FormGroup;
  constructor( public loadingCtrl: LoadingController,public Storage : NativeStorage ,public fb: FormBuilder ,public RequestsProvider: RequestsProvider ,public navCtrl: NavController, public navParams: NavParams) {
    this.loginForm =this.fb.group({
      Username: ['',Validators.required],
      Password: ['',Validators.required]
    });

  }
  register(){
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present()
      console.log("i was clicked");
      console.log(this.loginForm.value);
      this.Storage.getItem('Email').then( data => {
        console.log('Your Email is', data);
        const data1 ={
         Email: data,
         password: this.loginForm.value.Password,
         name:     this.loginForm.value.Username
         }
         this.RequestsProvider.register(data1).subscribe(results => {
           alert("Account Created");
             loading.dismiss();
           this.navCtrl.setRoot(LoginPage);
         });
      });
      /*this.RequestsProvider.register(data).toPromise().then(res=>{
        if(res.status==201){
          console.log(res);
        }else{

        }
      })*/
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterdataPage');
  }

}
