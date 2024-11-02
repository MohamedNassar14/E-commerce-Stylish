import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SneakersRoutingModule } from './sneakers-routing.module';
import { SneakersComponent } from './components/sneakers/sneakers.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SneakersComponent
  ],
  imports: [
    CommonModule,
    SneakersRoutingModule,
    HttpClientModule,
    SharedModule
  ]
})
export class SneakersModule { }
