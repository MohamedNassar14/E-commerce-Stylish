import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BagsComponent } from './components/bags/bags.component';

const routes: Routes = [{path:'', component:BagsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BagsRoutingModule { }
