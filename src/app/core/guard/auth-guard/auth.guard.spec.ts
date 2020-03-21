import { TestBed, async, inject } from '@angular/core/testing';
/*Module*/
import { RouterTestingModule } from '@angular/router/testing';
/*File*/
import { AuthGuard } from './auth.guard';
/*Service*/
import { DatePipe } from '@angular/common';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, DatePipe, MalihuScrollbarService],
      imports: [RouterTestingModule]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
