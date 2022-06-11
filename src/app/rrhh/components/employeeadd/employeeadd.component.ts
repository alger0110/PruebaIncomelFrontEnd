import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from 'src/app/core/models/employee';
import { EmployeeService } from 'src/app/core/services/rrhh/employee.service';
import { SessionService } from 'src/app/core/services/security/session.service';
import { Wages } from '../../../core/models/wages';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employeeadd',
  templateUrl: './employeeadd.component.html',
  styleUrls: ['./employeeadd.component.css'],
})
export class EmployeeaddComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private employeeService: EmployeeService,
    private router: Router
  ) {
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
        dpi: formv.dpi,
        sons: formv.sons,
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

      this.employeeService.saveEmploye(model).subscribe(
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
