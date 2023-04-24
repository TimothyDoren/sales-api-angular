export class Order {

     id: number = 0;
     date: string = "";
    description: string = "";
    status: string = "NEW";
    total: number = 0;

    customerId: number = 0;
    customer = null;
}