import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }

  getProductsByCategories(category:string):Observable<any>
  {
    return this._HttpClient.get(`https://dummyjson.com/products/category/${category}`);
  }

  getSingleProduct(id:number):Observable<any>
  {
    return this._HttpClient.get(`https://dummyjson.com/products/${id}`);
  }
}
