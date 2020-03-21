import { Component, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HelperService } from './../../src/app/core/services/helper';
import { Subject, Observable }  from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'basic-app';
  isLoading: boolean = false;
  unsubscribeAll = new Subject();

  constructor(public translate: TranslateService, public helperService: HelperService, private toastyService:ToastrService) {   
     translate.setDefaultLang('en');
     // translate.use('en');

		this.helperService.loadingPropertyChanged$.pipe(takeUntil(this.unsubscribeAll))
		  .subscribe(value => this.isLoading = value);

    this.helperService.toastChanged$.pipe(takeUntil(this.unsubscribeAll))
      .subscribe(value => this.addToast(value));
  }


  addToast(toast) {
    switch (toast.type) {        
        case 'info': this.toastyService.info(toast.message); break;
        case 'success': this.toastyService.success(toast.message); break;
        case 'error': this.toastyService.error(toast.message); break;
        case 'warning': this.toastyService.warning(toast.message); break;
    }
  }

  ngOnDestroy(){
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
