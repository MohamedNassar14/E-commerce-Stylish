import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = 
[
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', loadChildren: ()=> import(`./home/home.module`).then((m)=> m.HomeModule)},
  {path:'shop/products', loadChildren: ()=> import(`./products/products.module`).then((m)=> m.ProductsModule)},
  {path:'shop/clothes', loadChildren: ()=> import(`./clothes/clothes.module`).then((m)=> m.ClothesModule)},
  {path:'shop/sneakers', loadChildren: ()=> import(`./sneakers/sneakers.module`).then((m)=> m.SneakersModule)},
  {path:'shop/watches', loadChildren: ()=> import(`./watches/watches.module`).then((m)=> m.WatchesModule)},
  {path:'shop/bags', loadChildren: ()=> import(`./bags/bags.module`).then((m)=> m.BagsModule)},
  {path:'shop/carts', canActivate:[AuthGuard], loadChildren: ()=> import(`./carts/carts.module`).then((m)=> m.CartsModule)},
  {path:'shop/wish-list', loadChildren: ()=> import(`./wish-list/wish-list.module`).then((m)=> m.WishListModule)},
  {path:'account', loadChildren: ()=> import(`./auth/auth.module`).then((m) => m.AuthModule)},
  {path:'pages', loadChildren: ()=> import(`./pages/pages.module`).then((m) => m.PagesModule)},
  {path:'**', loadChildren: ()=> import(`./shared/shared.module`).then((m)=> m.SharedModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
