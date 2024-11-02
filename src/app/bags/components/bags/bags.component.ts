import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { BagsService } from '../../services/bags.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bags',
  templateUrl: './bags.component.html',
  styleUrls: ['./bags.component.scss']
})
export class BagsComponent implements OnInit {

  constructor(private _BagsService:BagsService, private _SharedService:SharedService, private toast:ToastrService) {}

  allBags:Product[] = [];
  productsCart:Product[] = [];
  productsWishList:Product[] = [];
  spinner:boolean = false;

  ngOnInit(): void {
    this.getAllBags();
  }
  //Get mens clothes
  getAllBags()
  {
    this.spinner;
    this._BagsService.getBagsByCategory('womens-bags').subscribe({
      next:(data)=> 
      {
        this.spinner = true;
        this.allBags = data.products;
      }
    })
  }
  //Add product to cart
  addToCart(event:Product)
  {
    if(localStorage.getItem('productsCart') !== null)
    {
      this.productsCart = JSON.parse(localStorage.getItem('productsCart')!);
      //Check for if product exist already in productsCart 
      let newProduct:any = this.productsCart.find((item:Product)=> item.product.id == event.product.id);
      if(newProduct)
      {
        newProduct.quantity++;
        localStorage.setItem('productsCart', JSON.stringify(this.productsCart));
        this._SharedService.cartNumbers.next(this.productsCart.length);
        this._SharedService.allProductsCart.next(this.productsCart);
        this.toast.success('<i class="fa-solid fa-circle-check bg-toast-success text-xl pe-1"></i> Product increment by 1', '',{
          toastClass: 'toast-success', enableHtml: true});
      }
      else
      {
        this.productsCart.push(event);
        localStorage.setItem('productsCart', JSON.stringify(this.productsCart));
        this._SharedService.cartNumbers.next(this.productsCart.length);
        this._SharedService.allProductsCart.next(this.productsCart);
        this.toast.success('<i class="fa-solid fa-circle-check bg-toast-success text-xl pe-1"></i> Product added to cart', '',{
          toastClass: 'toast-success', enableHtml: true});
      }
    }
    else
    {
      this.productsCart.push(event);
      localStorage.setItem('productsCart', JSON.stringify(this.productsCart));
      this._SharedService.cartNumbers.next(this.productsCart.length);
      this._SharedService.allProductsCart.next(this.productsCart);
      this.toast.success('<i class="fa-solid fa-circle-check bg-toast-success text-xl pe-1"></i> Product added to cart', '',{
        toastClass: 'toast-success', enableHtml: true});
    }
  }
  //Add product to wishList 
  addToWishList(event:Product)
  {
    if(localStorage.getItem('productsWishList') != null)
    {
      this.productsWishList = JSON.parse(localStorage.getItem('productsWishList')!);
      let newProductWish = this.productsWishList.find((item)=> item.id === event.id);
      if(newProductWish)
      {
        this.toast.error('<i class="fa-solid fa-circle-exclamation bg-toast-error text-xl pe-1"></i> Product already added to wish list', '',{
          toastClass: 'toast-error', enableHtml: true});
      }
      else
      {
        this.productsWishList.push(event);
        localStorage.setItem('productsWishList', JSON.stringify(this.productsWishList));
        this._SharedService.wishListNumbers.next(this.productsWishList.length);
        this.toast.success('<i class="fa-solid fa-circle-check bg-toast-success text-xl pe-1"></i> Product added to wish list', '',{
          toastClass: 'toast-success', enableHtml: true});
      }
    }
    else
    {
      this.productsWishList.push(event);
      localStorage.setItem('productsWishList', JSON.stringify(this.productsWishList));
      this._SharedService.wishListNumbers.next(this.productsWishList.length);
      this.toast.success('<i class="fa-solid fa-circle-check bg-toast-success text-xl pe-1"></i> Product added to wish list', '',{
        toastClass: 'toast-success', enableHtml: true});
    }
  }
  //Remove product from wish list
  removeProductWishList(event:Product)
  {
    let newProductWish = this.productsWishList.find((item)=> item.id === event.id);
    if(newProductWish)
    {
      let currentProduct = this.productsWishList.indexOf(newProductWish);
      this.productsWishList.splice(currentProduct, 1);
      localStorage.setItem('productsWishList', JSON.stringify(this.productsWishList));
      this._SharedService.wishListNumbers.next(this.productsWishList.length);
      this.toast.error('<i class="fa-solid fa-circle-exclamation bg-toast-error text-xl pe-1"></i> Product removed from wish list', '',{
        toastClass: 'toast-error', enableHtml: true});
    }
  }
}
