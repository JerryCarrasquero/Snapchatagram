import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PhotographyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PhotographyProvider {
  url: String = "http://192.168.43.7:8080/Snapchatgramv2/";
  constructor(public http: HttpClient) {
    console.log('Hello PhotographyProvider Provider');
  }

  upload(data:any){
      console.log(data)
    return this.http.post<any>( `${this.url}Imageuploader`,JSON.stringify(data));
  }

  display(){
    return this.http.get<any>( `${this.url}Imageuploader`);
  }

  displayv(data:any){
    console.log(data)
    return this.http.post<any>( `${this.url}imageviver`,JSON.stringify(data));
  }

  postcomment(data:any){
    return this.http.post<any>( `${this.url}comment`,JSON.stringify(data));
  }

  viewcomment(data:any){
    return this.http.get<any>( `${this.url}comment?postid=${data}`);
  }
  likepicture(data:any){
    return this.http.post<any>( `${this.url}likes`,JSON.stringify(data));
  }

  delete(data:any){
    return this.http.post<any>( `${this.url}deletefromdb`,JSON.stringify(data));
  }

  displaylikes(data:any){
    return this.http.post<any>( `${this.url}favlist`,JSON.stringify(data));
  }

}
