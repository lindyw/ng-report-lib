import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopThreatsComponent } from './top-threats.component';

describe('TopThreatsComponent', () => {
  let component: TopThreatsComponent;
  let fixture: ComponentFixture<TopThreatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopThreatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopThreatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
