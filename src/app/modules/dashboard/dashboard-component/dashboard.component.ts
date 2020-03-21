import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { HelperService } from '../../../core';
import { ProductService } from '../product.service';
import { FormControl,
    FormGroup,
    FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  modalRef: BsModalRef;
  productData:any;
  searchField: FormControl;
  searchFrom: FormGroup;
  unsubscribeAll = new Subject();
  
  constructor(private modalService: BsModalService,private helperService: HelperService, public router: Router,private productService: ProductService, private fb:FormBuilder) { }

  ngOnInit() {
    this.searchField = new FormControl();
    this.searchFrom = this.fb.group({search: this.searchField});
     
    this.searchField.valueChanges.pipe(
       debounceTime(400),
       switchMap(term => this.productService.searchProduct(term)),
       takeUntil(this.unsubscribeAll))
      .subscribe((result) => 
        { 
          this.productData = result; 
        }); 

    this.getData();
  }

  logout() {
    if (this.helperService.getData('currentUser')) {
      this.helperService.clearData();
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['login']);
    }
  }

  openModal(modal: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      modal,
      Object.assign({}, { class: 'modal-dialog modal-lg' })
     );
  }

  getData(){
    this.productService.getProduct()
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((res) =>{
      this.productData = res;
    }, (err) => {
      this.helperService.showToast({message:err,type:'error'}); 
    });
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
