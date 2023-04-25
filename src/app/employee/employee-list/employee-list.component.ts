import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.class';
import { SystemService } from 'src/app/system/system.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {

  pageTitle: string = "Employee List";

  employees: Employee[] = [];
  constructor(
    private sys: SystemService,
    private emplSvc: EmployeeService
  ) {}

  ngOnInit(): void {
    this.sys.checkLogin();
    if(this.sys.loggedInEmployee !== null){
      console.log("Someone is Logged in");
    } else {
      console.log("No one is Logged in");
    }
    this.emplSvc.list().subscribe({
      next: (res) => {
        console.debug("Employees: ", res);
        this.employees = res;
      }, 
      error: (err) => {
        console.error(err);
      }
    })
  }
}
