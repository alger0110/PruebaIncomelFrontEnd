import { SessionService } from './../../../core/services/security/session.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../../../core/services/rrhh/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/core/models/employee';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employeeedit',
  templateUrl: './employeeedit.component.html',
  styleUrls: ['./employeeedit.component.css'],
})
export class EmployeeeditComponent implements OnInit {
  id: number = 0;
  employeId: number = 0;
  form: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];

      this.employeeService.getEmployee(this.id).subscribe(
        (employee) => {
          this.employeId =
            employee.wages[0].employeeId == null
              ? 0
              : employee.wages[0].employeeId;
          this.cargarDatos(employee);
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
      dpi: ['', [Validators.required]],
      sons: ['', [Validators.required]],
      fullname: ['', [Validators.required]],
      baseSalary: ['', [Validators.required]],
      decreeBond: ['250', [Validators.required]],
      igss: ['', [Validators.required]],
      irtra: ['', [Validators.required]],
      paternity: ['', [Validators.required]],
      totalSalary: ['', [Validators.required]],
      liquidSalary: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  cargarDatos(employee: Employee) {
    this.form.get('dpi')?.setValue(employee.dpi);
    this.form.get('fullname')?.setValue(employee.fullName);
    this.form.get('baseSalary')?.setValue(employee.baseSalary);
    this.form.get('decreeBond')?.setValue(employee.decreeBond);
    this.form.get('sons')?.setValue(employee.sons);
    this.form.get('igss')?.setValue(employee.wages[0].igss);
    this.form.get('irtra')?.setValue(employee.wages[0].irtra);
    this.form.get('paternity')?.setValue(employee.wages[0].paternityBonus);
    this.form.get('totalSalary')?.setValue(employee.wages[0].totalSalary);
    this.form.get('liquidSalary')?.setValue(employee.wages[0].liquidSalary);
  }

  get dpiField() {
    return this.form.get('dpi');
  }

  get fullnameField() {
    return this.form.get('fullname');
  }

  get baseSalaryField() {
    return this.form.get('baseSalary');
  }

  get decreeBondField() {
    return this.form.get('decreeBond');
  }

  get sonsField() {
    return this.form.get('sons');
  }

  submit(e: Event) {
    e.preventDefault();
    if (this.form.valid) {
      let formv = this.form.value;
      let model: Employee = {
        id: this.id,
        sons: formv.sons,
        dpi: formv.dpi,
        fullName: formv.fullname,
        baseSalary: formv.baseSalary,
        decreeBond: formv.decreeBond,
        userId: this.sessionService.currentUserValue.Id,
        wages: [
          {
            igss: formv.igss,
            irtra: formv.irtra,
            paternityBonus: formv.paternity,
            totalSalary: formv.totalSalary,
            liquidSalary: formv.liquidSalary,
          },
        ],
      };

      this.employeeService.updateEmployee(model).subscribe(
        (messagef) => {
          Swal.fire({
            icon: 'success',
            title: `${messagef.message}`,
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

  changeBaseSalary() {
    let baseSalary = +this.baseSalaryField?.value;
    let igss = baseSalary * 0.0483;
    let irtra = baseSalary * 0.01;
    this.form.get('igss')?.setValue(igss.toFixed(2));
    this.form.get('irtra')?.setValue(irtra.toFixed(2));
  }

  changesons() {
    let sons = +this.sonsField?.value;
    this.form.get('paternity')?.setValue(sons * 133);

    let baseSalary = +this.baseSalaryField?.value;
    let decreeBond = +this.decreeBondField?.value;
    let paternety = +this.form.get('paternity')?.value;
    this.form.get('totalSalary')?.setValue(baseSalary + decreeBond + paternety);

    let totalSalary = +this.form.get('totalSalary')?.value;
    let igss = +this.form.get('igss')?.value;
    let irtra = +this.form.get('irtra')?.value;

    this.form.get('liquidSalary')?.setValue(totalSalary - igss - irtra);
  }
}
