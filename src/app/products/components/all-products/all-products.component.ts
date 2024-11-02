import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductsService } from '../../services/products.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  constructor(private _ProductsService:ProductsService, private _SharedService:SharedService, private toast:ToastrService) {}


  allClothes:Product[] = [];
  allWatches:Product[] = [];
  allShoes:Product[] = [];
  allBags:Product[] = [];
  productsCart:Product[] = [];
  productsWishList:Product[] = [];
  spinner:boolean = false;


  ngOnInit(): void {
    this.getAllClothes();
    this.getAllWatches();
    this.getAllShoes();
    this.getAllBags();
  }

  //Get all clothes
  getAllClothes()
  {
    this.spinner;
    this._ProductsService.getProductsByCategories('mens-shirts').subscribe({
      next:(data)=> 
      {
        this.spinner = true;
        this.allClothes = data.products.slice(0, 4);
      }
    })
  }
  //Get all watches
  getAllWatches()
  {
    this.spinner;
    this._ProductsService.getProductsByCategories('mens-watches').subscribe({
      next:(data)=> 
      {
        this.spinner = true;
        this.allWatches = data.products.slice(0, 4);
      }
    })
  }
  //Get all shoes
  getAllShoes()
  {
    this.spinner;
    this._ProductsService.getProductsByCategories('mens-shoes').subscribe({
      next:(data)=> 
      {
        this.spinner = true;
        this.allShoes = data.products.slice(0, 4);
      }
    })
  }
  //Get all bags
  getAllBags()
  {
    this.spinner;
    this._ProductsService.getProductsByCategories('womens-bags').subscribe({
      next:(data)=> 
      {
        this.spinner = true;
        this.allBags = data.products.slice(0, 4);
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
