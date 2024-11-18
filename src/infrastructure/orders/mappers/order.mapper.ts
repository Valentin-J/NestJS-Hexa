import { FleetOrder } from "../../../domain/models/FleetOrder";
import { Order } from "../models/Order";

export default class OrderMapper {
    public static toDomain(order: Order): FleetOrder {
        if (!order) {
            return null;
        }

        const fleetOrder = new FleetOrder(
            order.id == undefined ? "" : order.id.toString(),
            order.fleet,
            order.numberOfPassengers,
            order.orderDate == null ? new Date() : order.orderDate
        );

        return fleetOrder;
    }

    public static toDomains(order: Order[]): FleetOrder[] {
        const fleetOrders = new Array<FleetOrder>();

        order.forEach((el) => {
            const fleetOrder = this.toDomain(el);
            fleetOrders.push(fleetOrder);
        });

        return fleetOrders;
    }
}