import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NewProductModalComponent } from './new-product-modal/new-product-modal.component';

@NgModule({
  declarations: [NewProductModalComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  exports:[
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    NewProductModalComponent
  ]
})
export class SharedModule { }
