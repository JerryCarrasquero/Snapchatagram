import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms'
import { TabsPage } from '../tabs/tabs';
import { NativeStorage } from '@ionic-native/native-storage';
import { RequestsProvider } from '../../providers/requests/requests';
/**
 * Generated class for the ModifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modify',
  templateUrl: 'modify.html',
})
export class ModifyPage {
  private name: String;
  private email: String;
  private error: String;
  private password: String;
  private userid: String;
  private biography: String;
    private loginForm: FormGroup;
  constructor(public RequestsProvider: RequestsProvider ,public fb: FormBuilder ,public navCtrl: NavController, public storage : NativeStorage , public navParams: NavParams) {
    this.loginForm =this.fb.group({
      Email: ['',Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      password: ['',Validators.required],
      name:['',Validators.required],
      biography:[''],
      passwordnew:['']
    });
    this.error="null";
    this.name="placeholder";
    this.email="placeholder";
    this.biography="placeholder";
    this.password="placeholder";
  }

    login(){
          let data =null;
          console.log(this.loginForm.value);
          console.log(this.password);
          console.log(this.loginForm.value['password']);
          if (this.password!=this.loginForm.value['password']){
            this.error="wrong password";
          }else{
            if(this.loginForm.value['passwordnew']!=""){
              data ={
                email:this.loginForm.value['Email'],
                password:this.loginForm.value['passwordnew'],
                biography:this.loginForm.value['biography'],
                name:this.loginForm.value['name'],
                userid:this.userid
              }
            }else{
              data ={
                email:this.loginForm.value['Email'],
                password:this.loginForm.value['password'],
                biography:this.loginForm.value['biography'],
                name:this.loginForm.value['name'],
                userid:this.userid
              }
            }
            this.RequestsProvider.Modifyd(data).subscribe(results => {
              console.log(results);
              alert("Account Modify");
              this.navCtrl.setRoot(TabsPage);
            });
          }
       }
  ionViewDidLoad() {
    this.storage.getItem('Email').then( val => {
          this.email=val;
          console.log(val);
        });
    this.storage.getItem('name').then(val => {
          this.name=val;
          console.log(val);
        });
    this.storage.getItem('biography').then(val => {
          this.biography=val;
          console.log(val);
          });
    this.storage.getItem('password').then(val => {
          this.password=val;
          console.log(val);
          });
          console.log("loaded");

      this.storage.getItem('Userid').then(val => {
          this.userid=val;
          console.log(val);
          });
          console.log("loaded");
    console.log('ionViewDidLoad ModifyPage');
  }

}
