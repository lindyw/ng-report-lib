import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TenantSecurityControlComponent } from './tenant-security-control.component';


describe('TenantTenantSecurityControlComponent', () => {
  let component: TenantSecurityControlComponent;
  let fixture: ComponentFixture<TenantSecurityControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantSecurityControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantSecurityControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
