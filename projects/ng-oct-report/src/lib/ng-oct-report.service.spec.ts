import { TestBed } from '@angular/core/testing';

import { NgOctReportService } from './ng-oct-report.service';

describe('NgOctReportService', () => {
  let service: NgOctReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgOctReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
