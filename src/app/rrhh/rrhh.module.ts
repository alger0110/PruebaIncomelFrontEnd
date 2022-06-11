import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RrhhRoutingModule } from './rrhh-routing.module';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeaddComponent } from './components/employeeadd/employeeadd.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeeditComponent } from './components/employeeedit/employeeedit.component';

@NgModule({
  declarations: [EmployeesComponent, EmployeeaddComponent, EmployeeeditComponent],
  imports: [CommonModule, RrhhRoutingModule, ReactiveFormsModule],
  exports: [EmployeesComponent, EmployeeaddComponent, EmployeeeditComponent],
})
export class RrhhModule {}
