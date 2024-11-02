import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { SharedService } from '../../services/shared.service';
import { AuthService } from 'src/app/auth/services/auth.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _SharedService:SharedService, private _AuthService:AuthService) {}  
  
  cartNumbers:number = 0;
  wishListNumbers = 0;
  productsCart:Product[]  = [];
  dropDown:boolean = false;
  isLogin:boolean = false;
  menuToggle:boolean = false;
  maxHeightMenu:string = '';

  
  ngOnInit(): void {
    //Subscribe if any change make and return the result
    this._SharedService.cartNumbers.subscribe({
      next:(data)=> this.cartNumbers = data
    })
    //Subscribe if any change make and return the result
    this._SharedService.allProductsCart.subscribe({
      next:(data)=> this.productsCart = data
    })
    //Subscribe if any change make and return the result
    this._SharedService.wishListNumbers.subscribe({
      next:(data)=> this.wishListNumbers = data 
    })
    //return numbers of products cart from local storage if data exist
    if(localStorage.getItem('productsCart') !=null)
    {
      this.cartNumbers = JSON.parse(localStorage.getItem('productsCart')!).length;
    }
    //return products of cart from local storage if data exist
    if(localStorage.getItem('productsCart') != null)
    {
      this.productsCart = JSON.parse(localStorage.getItem('productsCart')!);
    }
    //Check the user exist the website or not
    this._AuthService.userData.subscribe({
      next:(data)=> {
        if(data != null)
        {
          this.isLogin = true;
        }
        else
        {
          this.isLogin = false;
        }
      }
    })
  } 

  boxToggle()
  {
    this.dropDown = !this.dropDown
  }
   
  logOut()
   {
    this._AuthService.signOut();
   }

   openMenuList()
   {
      this.maxHeightMenu = '100vh';
      this.menuToggle = !this.menuToggle
   }

   closeMenuList()
   {
      this.maxHeightMenu = '0';
      this.menuToggle = !this.menuToggle
   }
}
