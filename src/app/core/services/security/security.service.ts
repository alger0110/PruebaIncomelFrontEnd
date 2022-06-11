import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tokenjwt } from '../../models/tokenjwt';
import { environment } from '../../../../environments/environment';
import { Loginrequest } from '../../models/request/loginrequest';
import { Forgotpasswordsendrequest } from '../../models/request/forgotpasswordsendrequest';
import { MessageResponse } from '../../models/message-response';
import { ForgotPasswordValidationRequest } from '../../models/request/forgot-password-validation-request';
import { ChangePassword } from '../../models/request/change-password';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  constructor(private httpClient: HttpClient) {}

  login(model: Loginrequest) {
    return this.httpClient.post<Tokenjwt>(
      `${environment.API_URL}/User/Authenticate`,
      model
    );
  }

  forgotPasswordSend(model: Forgotpasswordsendrequest) {
    return this.httpClient.post<MessageResponse>(
      `${environment.API_URL}/User/ForgotPasswordSend`,
      model
    );
  }

  forgotPasswordValidation(model: ForgotPasswordValidationRequest) {
    return this.httpClient.post<MessageResponse>(
      `${environment.API_URL}/User/ForgotPasswordValidation`,
      model
    );
  }

  changePassword(model: ChangePassword) {
    return this.httpClient.post<MessageResponse>(
      `${environment.API_URL}/User/ChangePassword`,
      model
    );
  }

  parseJWT(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }
}
