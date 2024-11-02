import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SneakersComponent } from './components/sneakers/sneakers.component';

const routes: Routes = [{path:'', component:SneakersComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SneakersRoutingModule { }
