import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordValidationComponent } from './components/forgot-password-validation/forgot-password-validation.component';
import { SharedModule } from '../shared/shared.module';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

@NgModule({
  declarations: [LoginComponent, ForgotPasswordValidationComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [LoginComponent, ForgotPasswordValidationComponent, ForgotPasswordComponent],
})
export class SecurityModule {}
