import { TestBed } from '@angular/core/testing';
/*Service*/
import { HelperService } from './helper.service';
import { DatePipe } from '@angular/common';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';

describe('HelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({
  	providers: [DatePipe, MalihuScrollbarService],
  }));

  it('should be created', () => {
    const service: HelperService = TestBed.get(HelperService);
    expect(service).toBeTruthy();
  });
});
