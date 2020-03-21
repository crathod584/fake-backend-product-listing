import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { HelperService } from '../../../core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loginButtonDisable: boolean = false;
  errorMsg:string = null;
  unsubscribeAll = new Subject();

  constructor(private fb: FormBuilder, private helperService: HelperService, private router: Router, private loginService: LoginService) {
    let currentUser = this.helperService.getData('currentUser');

    if (currentUser && currentUser['token'] != undefined){
           this.router.navigate(['dashboard']);
    }

    this.createForm();
  }
  
  ngOnInit() { 
  }

  get f() { return this.loginForm.controls; }
  
  createForm() {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  
  /**
  * @method - login
  * @desc - login methode for check user authentication
  */
  login() {
    this.errorMsg = null;
    this.loginButtonDisable = true;
    this.helperService.showLoading(true);
    if(this.loginForm.value.username && this.loginForm.value.password){ 
      let loginCredential = JSON.parse(JSON.stringify(this.loginForm.value))
      this.loginService.login(loginCredential)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe( 
        (res) => {
          this.helperService.setData('currentUser',res);  
          this.loginButtonDisable = false;
          if(this.helperService.redirectUrl){
           this.router.navigate([this.helperService.redirectUrl]);      
          }else{
           this.router.navigate(['dashboard']);      
          }
          
          this.helperService.showLoading(false);
         
        }, 
        (err) => {
          this.helperService.showLoading(false);

          this.loginButtonDisable = false;
          this.helperService.showToast({message:err,type:'error'});
        });
    }else{
      this.loginButtonDisable = false;
    }  
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
