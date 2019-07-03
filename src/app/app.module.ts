import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule} from '@ionic/storage';
import { Base64 } from '@ionic-native/base64';
//import { Storage } from '@ionic/storage';
import {NativeStorage } from '@ionic-native/native-storage';
import { HttpClientModule } from '@angular/common/http';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { ImageviewerPage } from '../pages/imageviewer/imageviewer';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { UploadPage } from '../pages/upload/upload';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/Register/Register';
import { RegisterdataPage } from '../pages/Registerdata/Registerdata';
import { ModifyPage }from '../pages/Modify/Modify'
import {Validators, FormBuilder, FormGroup,FormsModule,ReactiveFormsModule} from '@angular/forms'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RequestsProvider } from '../providers/requests/requests';
import { CommonModule } from '@angular/common';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { PhotographyProvider } from '../providers/photography/photography';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterdataPage,
    RegisterPage,
    ModifyPage,
    UploadPage,
    ImageviewerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterdataPage,
    RegisterPage,
    ModifyPage,
    UploadPage,
    ImageviewerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    RequestsProvider,
    NativeStorage,
    Base64,
    File,
    FilePath,
    Camera,
    PhotographyProvider,
    PhotoViewer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
