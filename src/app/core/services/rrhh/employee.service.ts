import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Employee } from '../../models/employee';
import { MessageResponse } from '../../models/message-response';
import { EmployeeRequest } from '../../models/request/employee-request';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}

  employees() {
    return this.httpClient.get<Employee[]>(
      `${environment.API_URL}/Employee/Employees`
    );
  }

  saveEmploye(model: Employee) {
    return this.httpClient.post<MessageResponse>(
      `${environment.API_URL}/Employee/Create`,
      model
    );
  }

  deleteEmployee(id: number) {
    return this.httpClient.delete<MessageResponse>(
      `${environment.API_URL}/Employee/Delete?id=${id}`
    );
  }

  getEmployee(id: number) {
    return this.httpClient.get<Employee>(
      `${environment.API_URL}/Employee/getEmployee?id=${id}`
    );
  }

  updateEmployee(model: Employee) {
    return this.httpClient.put<MessageResponse>(
      `${environment.API_URL}/Employee/Update`,
      model
    );
  }
}
