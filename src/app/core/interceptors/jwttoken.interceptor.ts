import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { SessionService } from '../services/security/session.service';

@Injectable()
export class JwttokenInterceptor implements HttpInterceptor {
  currentUserObservable: Observable<User>;
  currentUser: User | undefined;
  constructor(private sessionService: SessionService) {
    this.currentUserObservable = this.sessionService.currentUserValueObservable;
    this.currentUserObservable.subscribe((user) => (this.currentUser = user));
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.currentUser && this.currentUser.Token) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.currentUser.Token}`,
        },
      });
    }
    return next.handle(request);
  }
}
