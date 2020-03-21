import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
/*Service*/
import { HelperService } from '../services/helper/helper.service';
/*RxJS*/
import { catchError } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router,private helperService: HelperService) {}

  intercept(req: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
    // Clone the request to add the new header.
    if(this.helperService.getData('currentUser')){
        req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.helperService.getKeyData('currentUser','token')}`,
        }
      });
    }

    //send the newly created request
    return next.handle(req).pipe(catchError(err => {
       if (err.status === 401) {  
        this.helperService.clearData();
        this.helperService.showLoading(false);
        this.helperService.showToast({message:err.error.message || err.error.message,type:'error'});
        //redirect to the login page 
        this.router.navigate(['login']); //remember to impor
      }

           return throwError(err);
    }))
  }
}