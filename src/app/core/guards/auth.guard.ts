import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/security/session.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private sessionService: SessionService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.sessionService.currentUserValue;
    if (currentUser) {
      return true;
    }

    Swal.fire({
      icon: 'error',
      title: 'Inicio de Session Requerido',
      text: 'No has ingresado a tu sesión. Te redirigimos ahora a la pantalla correspondiente.',
      footer: '<a href="/home/help">Ayuda</a>',
    });
    this.router.navigate(['/security/login']);
    return false;
    return true;
  }
}
