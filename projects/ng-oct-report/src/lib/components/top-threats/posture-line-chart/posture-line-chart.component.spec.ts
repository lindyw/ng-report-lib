import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostureLineChartComponent } from './posture-line-chart.component';

describe('PostureLineChartComponent', () => {
  let component: PostureLineChartComponent;
  let fixture: ComponentFixture<PostureLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostureLineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostureLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
