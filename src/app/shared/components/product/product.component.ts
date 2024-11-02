import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../interfaces/product';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor() {}

  @Input() product!:Product;
  @Output() sendProduct:EventEmitter<any> = new EventEmitter<any>();
  @Output() sendProductWish:EventEmitter<any> = new EventEmitter<any>();
  @Output() removeProductWish:EventEmitter<any> = new EventEmitter<any>();
  isWish:boolean = false;
  quantity:number = 1;

  ngOnInit(): void {} 
  
  //Transfer data from child to parent (addToCart)
  add()
  {
    this.sendProduct.emit({product:this.product, quantity:this.quantity});
  }
  //Transfer data from child to parent (addToWishList)
  productWish()
  {
    this.isWish = true;
    this.sendProductWish.emit(this.product);
  }

  removeProduct()
  {
    this.isWish = false;
    this.removeProductWish.emit(this.product);
  }
}
