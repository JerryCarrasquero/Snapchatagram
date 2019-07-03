import { Component } from '@angular/core';
import { TabsPage } from '../tabs/tabs';
import { NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms'
import { RegisterPage } from '../Register/Register';
import { RequestsProvider } from '../../providers/requests/requests';
import {NativeStorage } from '@ionic-native/native-storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private loginForm: FormGroup;
  private error: String;
  disabled:any;
  constructor(public fb: FormBuilder ,public navCtrl: NavController, public NativeStorage:NativeStorage, public navParams: NavParams, public RequestsProvider: RequestsProvider) {
    this.loginForm =this.fb.group({
      Email: ['',Validators.required],
      password: ['',Validators.required]
    });
    this.error=null;
    this.disabled=false;
    }
    register(){
      console.log("i was clicked");
      this.navCtrl.setRoot(RegisterPage);
    }

    login(){
      console.log(this.loginForm.value);
      let data=this.loginForm.value;
      this.RequestsProvider.login(data).subscribe(results => {
        console.log(results);
        if(results.status==401){
          this.error=results.message;
        }else if(results.status==200){
            this.navCtrl.setRoot(TabsPage);
            this.NativeStorage.setItem('Userid',results.userid).then(
              ()=>console.log('stored item!'),
              error=>console.error('error sorting item',error)
            );
        }else{
          this.error="Something went wrong";
        }
      });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
