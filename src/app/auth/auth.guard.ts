import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,  CanActivateFn,  Router,  RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private _AuthService:AuthService, private _Router:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    if(this._AuthService.userData.getValue() != null)
    {
      return true;
    }
    else
    {
      this._Router.navigate(['/account/login']);
      return false;
    }
   

  }
 
};
