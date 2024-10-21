import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private _ActivatedRoute:ActivatedRoute, private _ProductsService:ProductsService ) {}

  productDetails!:Product;

  ngOnInit(): void {
    let {id} = this._ActivatedRoute.snapshot.params;
    this.getSingleProduct(id);
  }

  getSingleProduct(id:number)
  {
    this._ProductsService.getSingleProduct(id).subscribe({
      next:(data)=> this.productDetails = data
    })
  }

}
