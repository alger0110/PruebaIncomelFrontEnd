import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityService } from 'src/app/core/services/security/security.service';
import { ForgotPasswordValidationRequest } from '../../../core/models/request/forgot-password-validation-request';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangePassword } from 'src/app/core/models/request/change-password';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  id: string = 'n';
  email: string = 'n';
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private securityService: SecurityService
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      let model: ForgotPasswordValidationRequest = {
        token: this.id,
      };

      this.securityService.forgotPasswordValidation(model).subscribe(
        (messagef) => {
          this.email = messagef.message;
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un error',
            text: `${error.error.message}`,
            footer: '<a href="/home/help">Ayuda</a>',
          });

          this.router.navigate(['security/forgotPasswordValidation']);
        }
      );
    });

    this.form = this.formBuilder.group({
      changePassword: ['', [Validators.required]],
      confirmChangePassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  get changePasswordField() {
    return this.form.get('changePassword');
  }

  get confirmChangePasswordField() {
    return this.form.get('confirmChangePassword');
  }

  submit(e: Event) {
    e.preventDefault();
    if (this.form.valid) {
      var formv = this.form.value;
      if (formv.changePassword == formv.confirmChangePassword) {
        let model: ChangePassword = {
          email: this.email,
          newPassword: formv.changePassword,
        };

        this.securityService.changePassword(model).subscribe(
          (messagef) => {
            Swal.fire({
              icon: 'success',
              title: `${messagef.message}`,
            });

            this.router.navigate(['security/login']);
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Ocurrio un error',
              text: `${error.error.message}`,
              footer: '<a href="/home/help">Ayuda</a>',
            });
          }
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un error',
          text: `Ambas contraseñas deben coincidir para proceder.`,
          footer: '<a href="/home/help">Ayuda</a>',
        });
      }
    }
  }
}
