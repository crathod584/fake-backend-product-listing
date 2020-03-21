import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
/*RX Js*/
import { Observable } from 'rxjs';
import { HelperService } from '../../services/helper';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router , private helperService: HelperService) {}
 
  /**
  * @method - canActivate
  * @desc - Check route authentication before navigate for parent route
  */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable < boolean > | Promise < boolean > | boolean {
    return this.checkAuthorization(state.url);
  }

  /**
  * @method - canActivateChild
  * @desc - Check route authentication before navigate for child route
  */
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable < boolean > | Promise < boolean > | boolean {
    return this.canActivate(route, state);
  }
  
  /**
  * @method - checkAuthorization
  * @desc - Check user is logged in or not
  */
  checkAuthorization(url) {
    let currentUser = this.helperService.getData('currentUser');

    if (currentUser && currentUser['token'] != undefined){
        return true; 

      this.helperService.redirectUrl = url;
      // Navigate to the login page with extras
      this.router.navigate(['login']);
      return false;       
    }
  }   
}
