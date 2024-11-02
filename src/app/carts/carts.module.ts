import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartsRoutingModule } from './carts-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { TitlePipe } from './pipes/title.pipe';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CartComponent,
    TitlePipe
  ],
  imports: [
    CommonModule,
    CartsRoutingModule,
    HttpClientModule,
    SharedModule
  ]
})
export class CartsModule { }
