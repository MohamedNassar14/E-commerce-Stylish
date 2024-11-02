import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BagsRoutingModule } from './bags-routing.module';
import { BagsComponent } from './components/bags/bags.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    BagsComponent
  ],
  imports: [
    CommonModule,
    BagsRoutingModule,
    HttpClientModule,
    SharedModule
  ]
})
export class BagsModule { }
