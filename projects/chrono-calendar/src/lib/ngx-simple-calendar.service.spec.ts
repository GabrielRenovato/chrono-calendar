import { TestBed } from '@angular/core/testing';

import { NgxSimpleCalendarService } from './ngx-simple-calendar.service';

describe('NgxSimpleCalendarService', () => {
  let service: NgxSimpleCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSimpleCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
