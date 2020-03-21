import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(data):Observable<any>{
    return this.http.post<any>(`${environment.backend_server_url}/addProduct`,data);
  }

  getProduct():Observable<any>{
    return this.http.get<any>(`${environment.backend_server_url}/products`);
  }

  searchProduct(str):Observable<any>{
    return this.http.post<any>(`${environment.backend_server_url}/search`,str);
  }
}
