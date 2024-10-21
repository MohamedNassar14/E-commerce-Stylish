import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatchesRoutingModule } from './watches-routing.module';
import { WatchesComponent } from './components/watches/watches.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    WatchesComponent
  ],
  imports: [
    CommonModule,
    WatchesRoutingModule,
    HttpClientModule,
    SharedModule
  ]
})
export class WatchesModule { }
