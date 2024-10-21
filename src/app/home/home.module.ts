import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from '../shared/shared.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule, 
    HomeRoutingModule,
    CarouselModule,
    SharedModule,
    LazyLoadImageModule
  ]
})
export class HomeModule {}
