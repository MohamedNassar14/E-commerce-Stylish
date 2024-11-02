import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Slides } from 'src/app/shared/interfaces/slides';
import { HomeService } from '../../services/home.service';
import { Product } from 'src/app/shared/interfaces/product';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _HomeService:HomeService, private _SharedService:SharedService, private toast:ToastrService) {}
   
  bestSellersProducts:Product[] = [];
  specialOffersProducts:Product[] = [];
  productsCart:Product[] = [];
  productsWishList:Product[] = [];
  currentSlide:number = 0;
  spinner:boolean = false;



  
  ngOnInit(): void {
    this.getAllBestSellers();
    this.getAllSpecialOffers();
  }

  selectImage(index:number)
  {
    this.currentSlide = index
  }

  bestSellers: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    margin: 20,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      600: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  getAllBestSellers()
  {
    this.spinner = false
    this._HomeService.getBestSellers('mens-shirts').subscribe({
      next:(data)=>
      {
        this.spinner = true;
        this.bestSellersProducts = data.products;
      }
    })
  }

  specialOffers: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    margin: 20,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      600: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  getAllSpecialOffers()
  {
    this.spinner = false
    this._HomeService.getBestSellers('womens-bags').subscribe({
      next:(data)=> 
      {
        this.spinner = true;
        this.specialOffersProducts = data.products;
      }
    })
  }
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
