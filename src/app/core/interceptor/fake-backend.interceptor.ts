import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
/*Service*/
import { HelperService } from '../services/helper/helper.service';
/*RxJS*/
import { Observable, throwError, of } from 'rxjs';
import { mergeMap, delay  } from 'rxjs/operators';
import users  from  '../../../assets/db/users.json';
import products  from  '../../../assets/db/product.json';


@Injectable({
  providedIn: 'root'
})
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(handleRoute),delay(500))

        function handleRoute() {
            switch (true) {
                case url.endsWith('/login') && method === 'POST':
                    return login();
                case url.endsWith('/products') && method === 'GET':
                    return getProducts();
                case url.endsWith('/search') && method === 'POST':
                    return searchProduct();
                // case url.match(/\/users\/\d+$/) && method === 'GET':
                //     return getUserById();
                // case url.match(/\/users\/\d+$/) && method === 'DELETE':
                //     return deleteUser();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function login() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            
            if (!user) return error('Username or password is incorrect');
            return ok(user);
        }

        function getProducts(){

         if (!isAuthorized()) return unauthorized();
         return ok(products);
        
        }

        function searchProduct(){
             if (!isAuthorized()) return unauthorized(); 
             let searchedProduct = [];
             if(body != " "){
                  searchedProduct = products.filter((product) => { 
                     return product.productName.toLowerCase().includes(body.toLowerCase());
                  })  
             }

             return ok(searchedProduct);
        }

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error(message) {
            return throwError(message);
        }

        function isAuthorized() {
            return headers.get('Authorization');
        }
    }
}