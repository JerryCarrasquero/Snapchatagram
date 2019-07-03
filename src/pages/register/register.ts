import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms'
import { LoginPage } from '../login/login';
import { NativeStorage } from '@ionic-native/native-storage';
import { RegisterdataPage } from '../Registerdata/Registerdata';
import { RequestsProvider } from '../../providers/requests/requests';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  private loginForm: FormGroup;
  private error: String;

  constructor(public fb: FormBuilder ,public navCtrl: NavController,public RequestsProvider: RequestsProvider, public navParams: NavParams, public storage : NativeStorage) {
    this.loginForm =this.fb.group({
      Email: ['',Validators.compose([Validators.maxLength(70), Validators.pattern('^[A-Za-z\d]{4,20}$'), Validators.required])]
    });
    this.error=null;
  }

  register(){
      console.log("i was clicked");
      console.log(this.loginForm.value);
      let data=this.loginForm.value;
      this.RequestsProvider.validate(data).subscribe(results => {
        console.log(results);
        if(results.status==401){
          this.error=results.message;
        }else if(results.status==200){
          this.storage.setItem('Email',this.loginForm.value.Email)
          this.navCtrl.setRoot(RegisterdataPage);
        }else{
          this.error="Something went wrong";
        }
      });

    }
  loginbck(){
        console.log("i was clicked too");
        this.navCtrl.setRoot(LoginPage);
        //this.navCtrl.setRoot(RegisterPage);
      }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
