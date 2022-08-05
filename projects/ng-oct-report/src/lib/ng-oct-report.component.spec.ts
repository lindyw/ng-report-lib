import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgOctReportComponent } from './ng-oct-report.component';

describe('NgOctReportComponent', () => {
  let component: NgOctReportComponent;
  let fixture: ComponentFixture<NgOctReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgOctReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgOctReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
