import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClothesService {

  constructor(private _HttpClient:HttpClient) { }

  getAllClothes(category:string):Observable<any>
  {
    return this._HttpClient.get(`https://dummyjson.com/products/category/${category}`);
  }
}
