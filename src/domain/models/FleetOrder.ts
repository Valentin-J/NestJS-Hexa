import { Fleet } from "./Fleet";

export class FleetOrder {
    id: string;
    fleet: Fleet;
    numberOfPassengers: number;
    orderDate: Date;

    constructor(id: string, fleet: Fleet, numberOfPassengers: number, orderDate: Date) {
        this.id = this.id;
        this.fleet = fleet;
        this.numberOfPassengers = numberOfPassengers;
        this.orderDate = orderDate;
    }
}
