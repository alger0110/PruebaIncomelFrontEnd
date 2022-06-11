import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { EmployeeaddComponent } from './components/employeeadd/employeeadd.component';
import { EmployeeeditComponent } from './components/employeeedit/employeeedit.component';

const routes: Routes = [
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employeeadd',
    component: EmployeeaddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employeeedit/:id',
    component: EmployeeeditComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RrhhRoutingModule {}
