import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Forgotpasswordsendrequest } from 'src/app/core/models/request/forgotpasswordsendrequest';
import { SecurityService } from 'src/app/core/services/security/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password-validation',
  templateUrl: './forgot-password-validation.component.html',
  styleUrls: ['./forgot-password-validation.component.css'],
})
export class ForgotPasswordValidationComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private securityService: SecurityService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      user: ['', [Validators.required, Validators.email]],
      birthdate: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  get userField() {
    return this.form.get('user');
  }

  get birthdatefield() {
    return this.form.get('birthdate');
  }

  submit(e: Event) {
    e.preventDefault();
    const formv = this.form.value;
    let model: Forgotpasswordsendrequest = {
      email: formv.user,
      birthDate: formv.birthdate,
    };
    this.securityService.forgotPasswordSend(model).subscribe(
      (messagef) => {
        let message = messagef.message;
        Swal.fire({
          icon: 'success',
          title: `${message}`,
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
  }
}
