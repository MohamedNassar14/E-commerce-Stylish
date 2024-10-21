import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { SharedService } from 'src/app/shared/services/shared.service';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  stripe: any;
  elements: any;

  constructor(private _SharedService:SharedService, private _HttpClient:HttpClient, private toast:ToastrService) {}

  productsCart:Product[] = [];
  totalPrice:number = 0;
  spinner:boolean = false;
  isLoading:boolean = false;

  ngOnInit(): void {
    this.getAllProductsFromUser();
    this.getTotalPrice();
  }
  //Get all products from user who add to cart
  getAllProductsFromUser()
  {
    this.spinner;
    if(localStorage.getItem('productsCart') !== null)
    {
      this.spinner = true;
      this.productsCart = JSON.parse(localStorage.getItem('productsCart')!);
    }
  }
  //To increase the quantity by 1
  plusProduct(index:number)
  {
    this.productsCart[index].quantity++;
    localStorage.setItem('productsCart', JSON.stringify(this.productsCart));
    this.getTotalPrice();
    this._SharedService.cartNumbers.next(this.productsCart.length);
    this._SharedService.allProductsCart.next(this.productsCart);
    this.toast.success('<i class="fa-solid fa-circle-check bg-toast-success text-xl pe-1"></i> Product increment by 1', '',{
      toastClass: 'toast-success', enableHtml: true});
  }
  //To decrease the quantity by 1
  minusProduct(index:number)
  {
    this.productsCart[index].quantity--;
    if(this.productsCart[index].quantity == 0)
    {
      this.productsCart.splice(index, 1);
      localStorage.setItem('productsCart', JSON.stringify(this.productsCart));
      this._SharedService.cartNumbers.next(this.productsCart.length);
      this._SharedService.allProductsCart.next(this.productsCart);
      this.toast.error('<i class="fa-solid fa-circle-exclamation bg-toast-error text-xl pe-1"></i> Product removed from cart ', '',{
        toastClass: 'toast-error', enableHtml: true});
    }
    else
    {
      localStorage.setItem('productsCart', JSON.stringify(this.productsCart));
      this._SharedService.cartNumbers.next(this.productsCart.length);
      this._SharedService.allProductsCart.next(this.productsCart);
      this.toast.success('<i class="fa-solid fa-circle-check bg-toast-success text-xl pe-1"></i> Product decrement by 1', '',{
        toastClass: 'toast-success', enableHtml: true});
    }
    this.getTotalPrice();
  }
  //Remove product from cart
  removeProduct(index:number)
  {
    this.productsCart.splice(index, 1);
    localStorage.setItem('productsCart', JSON.stringify(this.productsCart));
    this.getTotalPrice();
    this._SharedService.cartNumbers.next(this.productsCart.length);
    this._SharedService.allProductsCart.next(this.productsCart);
    this.toast.error('<i class="fa-solid fa-circle-exclamation bg-toast-error text-xl pe-1"></i> Product removed from cart', '',{
      toastClass: 'toast-error', enableHtml: true});
  }
  //Get Total price
  getTotalPrice()
  {
    this.totalPrice = 0;
    for(let product of this.productsCart)
    {
      this.totalPrice += product.product.price * product.quantity;
    }
  }
  //Payment gateway
  payment()
  {
    this.isLoading = true;
    //To open a session with stripe 
    this._HttpClient.post(`http://localhost:4242/checkout`, {
        items: this.productsCart
    }).subscribe(async(res:any)=> {
      let stripe = await loadStripe(`pk_test_51Q5X4aRwxGRAqufmrLF2b7KfyIuJYLxsfatDKECnBIBjOJW1DP4opgXwf2c0PHuIq9UrD3auPQ4eS2hPs9DMWDTD00fkaTbK3v`);
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    });
  }
}
