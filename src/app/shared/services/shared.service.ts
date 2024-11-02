import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() {}
   
  cartNumbers:BehaviorSubject<any> = new BehaviorSubject<any>(this.getCartNumber());
  cartNumbers$ = this.cartNumbers.asObservable();

  allProductsCart:BehaviorSubject<any> = new BehaviorSubject<any>(this.getAllProductsCart());
  allProductsCart$ = this.allProductsCart.asObservable();

  wishListNumbers:BehaviorSubject<any> = new BehaviorSubject<any>(this.getWishLisNumber());
  wishListNumbers$ = this.wishListNumbers.asObservable();

  //return length of productsCart
  getCartNumber()
  {
    if(localStorage.getItem('productsCart') != null)
    {
      return JSON.parse(localStorage.getItem('productsCart')!).length;
    }
    else
    {
      return 0;
    }
  }
  //return products from productsCart
  getAllProductsCart()
  {
    if(localStorage.getItem('productsCart') != null)
    {
      return JSON.parse(localStorage.getItem('productsCart')!);
    }
  }
  //return length of productsWishList
  getWishLisNumber()
  {
    if(localStorage.getItem('productsWishList') != null)
    {
      return JSON.parse(localStorage.getItem('productsWishList')!).length;
    }
    else
    {
      return 0;
    }
  }

}
