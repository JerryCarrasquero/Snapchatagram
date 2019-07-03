import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RequestsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RequestsProvider {
  url: String = "http://192.168.43.7:8080/Snapchatgramv2/";
  constructor(public http: HttpClient) {
    console.log('Hello RequestsProvider Provider');

  }

  login(data:any){
      console.log(data)
    return this.http.post<any>( `${this.url}loginhandler?login`,JSON.stringify(data));
  }

  validate(data:any){
    return this.http.get<any>( `${this.url}register?email=${data.Email}`);
  }

  register(data:any){
    return this.http.post<any>( `${this.url}register`,JSON.stringify(data));
  }

  searchinfo(data:any){
    return this.http.get<any>( `${this.url}profile?Userid=${data}`);
  }

  Modifyd(data:any){
    return this.http.post<any>(`${this.url}profile`,JSON.stringify(data))
  }

}
