import { Component } from '@angular/core';
import { Order } from '../order.class';
import { OrderService } from '../order.service';
import { Customer } from '../../customer/customer.class'
import { SystemService } from 'src/app/system/system.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {

  sortColumn: string = "id";
  sortAsc: boolean = true;

  pageTitle = "Order List";
  orders: Order[] = [];

  constructor(
    private sys: SystemService,
    private ordSvc: OrderService
  ){}

  selectColumn(col: string): void {
    if(col === this.sortColumn){
      this.sortAsc = !this.sortAsc;
      return;
    }
    this.sortAsc = true;
    this.sortColumn = col;
  }

  review(order: Order): void {
    if(order.total <= 75){
      order.status = "APPROVED";
    } else {
      order.status = "REVIEW";
    }
    this.ordSvc.change(order).subscribe({
      next: (res) => {
        console.debug("Order Reviewed");
        this.refresh();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  refresh(): void {
    this.sys.checkLogin();
    if(this.sys.loggedInEmployee !== null){
      console.log("Someone is Logged in");
    } else {
      console.log("No one is Logged in");
    }
    this.ordSvc.list().subscribe({
      next: (res) => {
        console.debug("Orders: ", res);
        this.orders = res;
        for(let o of this.orders){
          o.customerName = o.customer !== null ? o.customerName : "No Customer";
        }
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  ngOnInit(): void {
    this.refresh();
  }
}
