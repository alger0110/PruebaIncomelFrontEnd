import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Loginrequest } from 'src/app/core/models/request/loginrequest';
import { SecurityService } from 'src/app/core/services/security/security.service';
import { User } from '../../../core/models/user';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
import { SessionService } from 'src/app/core/services/security/session.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private securityService: SecurityService,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  get userField() {
    return this.form.get('user');
  }

  get passwordField() {
    return this.form.get('password');
  }

  login(e: Event) {
    e.preventDefault();
    if (this.form.valid) {
      const login = this.form.value;
      let loginDTo: Loginrequest = {
        username: login.user,
        password: login.password,
      };
      this.securityService.login(loginDTo).subscribe(
        (token) => {
          let jwtpayload = this.securityService.parseJWT(token.token);
          console.log(jwtpayload);
          let appUser: User = {
            Email: jwtpayload[environment.ClaimEmailAddress],
            Role: jwtpayload[environment.ClaimRole],
            Name: jwtpayload[environment.ClaimName],
            Id: jwtpayload[environment.ClaimId],
            Token: token.token,
          };

          this.sessionService.setCurrentUserValue(appUser);

          Swal.fire({
            icon: 'success',
            title: `Bienvenido ${appUser.Name}`,
          });
          this.router.navigate(['rrhh/employees']);
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
}
