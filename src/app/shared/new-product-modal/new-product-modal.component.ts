import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../modules/dashboard/product.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-new-product-modal',
  templateUrl: './new-product-modal.component.html',
  styleUrls: ['./new-product-modal.component.scss']
})
export class NewProductModalComponent implements OnInit, OnDestroy {
  
  @Input() modalRef:BsModalRef;
  @Input() runningBalance:number;
  @Output() getData = new EventEmitter(); 
  
  newProductForm: FormGroup;
  unsubscribeAll = new Subject();
  
  constructor(private fb: FormBuilder,private productService:ProductService) { }

  ngOnInit() {
  }

  get form() { return this.newProductForm.controls; }

  createForm() {
    this.newProductForm = this.fb.group({
      ProductType: ["", Validators.required],
      amount: ["", Validators.required],
      description: ["", Validators.required],
      date:new Date()
    });
  }


  addProduct(){

  	this.productService.addProduct(this.newProductForm.value)
    .pipe(takeUntil(this.unsubscribeAll))   
    .subscribe((res) =>{
      this.getData.emit();
      this.modalRef.hide();
    }, (err) => {
      console.log('err',err)
    });
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
