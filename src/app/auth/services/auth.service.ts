import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient, private _Router:Router) 
  {
    if(localStorage.getItem('userToken') != null)
    {
      this.saveUserData()
    }
  }


  userData:BehaviorSubject<any> = new BehaviorSubject<any>(null);


  saveUserData()
  {
    let encodedToken = JSON.stringify(localStorage.getItem('userToken'));
    let decodedToken:object = jwtDecode(encodedToken);
    this.userData.next(decodedToken);
  }


  signUp(userData:object):Observable<any>
  {  
    return this._HttpClient.post(`https://movies-api.routemisr.com/signup`, userData);

  }

  signIn(userData:object):Observable<any>
  {
    return this._HttpClient.post(`https://movies-api.routemisr.com/signin`, userData);
  }

  signOut()
  {
    localStorage.removeItem('userToken'); 
    this.userData.next(null);
    this._Router.navigate(['/home']);
  }
}
