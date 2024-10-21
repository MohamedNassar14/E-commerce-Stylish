import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductComponent } from './components/product/product.component';
import { CutTitlePipe } from './pipes/cut-title.pipe';
import { CutDescPipe } from './pipes/cut-desc.pipe';
import { SpinnersComponent } from './components/spinners/spinners.component';
import { ProductOffersComponent } from './components/product-offers/product-offers.component';
import { FooterComponent } from './components/footer/footer.component';




@NgModule({
  declarations: [
    NavbarComponent,
    NotfoundComponent,
    ProductComponent,
    CutTitlePipe,
    CutDescPipe,
    SpinnersComponent,
    ProductOffersComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
  ],
  exports:[NavbarComponent, NotfoundComponent, ProductComponent, ProductOffersComponent, SpinnersComponent, CutTitlePipe, CutDescPipe, FooterComponent]
})
export class SharedModule { }
