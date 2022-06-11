import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordValidationComponent } from './forgot-password-validation.component';

describe('ForgotPasswordValidationComponent', () => {
  let component: ForgotPasswordValidationComponent;
  let fixture: ComponentFixture<ForgotPasswordValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
