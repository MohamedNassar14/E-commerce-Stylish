import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ClothesRoutingModule } from './clothes-routing.module';
import { ClothesComponent } from './components/clothes/clothes.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ClothesComponent
  ],
  imports: [
    CommonModule,
    ClothesRoutingModule,
    HttpClientModule,
    SharedModule
  ]
})
export class ClothesModule { }
