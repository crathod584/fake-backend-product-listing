import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HelperService {
 
  redirectUrl:string;

  private loadingPropertyChanged = new Subject<boolean>(); // sho/hide loader
  loadingPropertyChanged$ : Observable<any> = this.loadingPropertyChanged.asObservable();
  
  private toastChanged = new Subject<any>(); //for toasty 
  toastChanged$ : Observable<any> = this.toastChanged.asObservable();  

  constructor() { }

  showLoading(value){
    this.loadingPropertyChanged.next(value)
  }

   showToast(toast:any){
    this.toastChanged.next(toast);
  }

  setData(itemName,data){
    localStorage.setItem(itemName, JSON.stringify(data));
  }

  getData(itemName){
    return JSON.parse(localStorage.getItem(itemName));
  }

  getKeyData(itemName,key){
    return JSON.parse(localStorage.getItem(itemName))[key];
  }
  
  clearData(){
    localStorage.clear();
  }


}

