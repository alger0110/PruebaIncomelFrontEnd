import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/core/services/rrhh/employee.service';
import { Employee } from '../../../core/models/employee';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] | undefined;
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.employeeService.employees().subscribe(
      (employeesv) => {
        this.employees = employeesv;
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

  ngOnInit(): void {}

  deleteEmployee(employee: Employee) {
    Swal.fire({
      title: `¿Desea eliminar al empleado ${employee.fullName}, con identificador ${employee.id}?`,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        let id: number = employee.id == null ? 0 : employee.id;
        this.employeeService.deleteEmployee(id).subscribe(
          (messagef) => {
            Swal.fire({
              icon: 'success',
              title: `${messagef.message}`,
            });

            location.reload();
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
    });
  }
}
