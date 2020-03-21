import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard-component/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    DashboardRoutingModule,
    SharedModule,
    ModalModule.forRoot()
  ]
})
export class DashboardModule { }
