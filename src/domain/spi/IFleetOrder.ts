import { FleetOrder } from "../models/FleetOrder";

export interface IFleetOrder {
    createOrder(orderToCreate: FleetOrder): Promise<FleetOrder>;

    findOrder(orderId: string): Promise<FleetOrder>;
}

export const IFleetOrder = Symbol("IFleetOrder");