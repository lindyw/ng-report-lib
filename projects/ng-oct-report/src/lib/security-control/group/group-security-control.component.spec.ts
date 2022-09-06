import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSecurityControlComponent } from './group-security-control.component';

describe('GroupSecurityControlComponent', () => {
  let component: GroupSecurityControlComponent;
  let fixture: ComponentFixture<GroupSecurityControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupSecurityControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupSecurityControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
