import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { SharedService } from 'src/app/shared/services/shared.service';


@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  constructor(private _SharedService:SharedService, private toast:ToastrService) {}

  productsWishList:Product[] = [];
  spinner:boolean = false;

  ngOnInit(): void {
    this.getProductsWishList();
  }
  //Get Products from user who add to wish list
  getProductsWishList()
  {
    this.spinner= true;
    if(localStorage.getItem('productsWishList') !== null)
    {
      this.spinner = true;
      this.productsWishList = JSON.parse(localStorage.getItem('productsWishList')!);
    }
  }
  //Remove product from wish list
  removeProductFromWish(index:number)
  {
    this.productsWishList.splice(index, 1);
    localStorage.setItem('productsWishList', JSON.stringify(this.productsWishList));
    this._SharedService.wishListNumbers.next(this.productsWishList.length); 
    this.toast.error('<i class="fa-solid fa-circle-exclamation bg-toast-error text-xl pe-1"></i> Product removed from wish list', '',{
      toastClass: 'toast-error', enableHtml: true});
  }
}
