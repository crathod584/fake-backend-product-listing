import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ErrorInterceptor,FakeBackendInterceptor } from './';

export const providers = [
  /*Http interceptor to use class for interceptor*/
  
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }, 
 
  {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
  }
  
];


@NgModule({
  declarations: [],
  imports: [
   HttpClientModule
  ]
})
export class CoreModule {
  
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    /*if load multiple time give error*/
    if (parentModule) {
      throw new Error('Module Already Loaded');
    }
  }

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [ ...providers ]
    }
  }

}
