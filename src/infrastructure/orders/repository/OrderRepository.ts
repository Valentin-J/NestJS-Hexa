import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FleetOrder } from "../../../domain/models/FleetOrder";
import { IFleetOrder } from "../../../domain/spi/IFleetOrder";
import { Order } from "../models/Order";
import OrderMapper from "../mappers/order.mapper";

@Injectable()
export class OrderRepository implements IFleetOrder {

    constructor(@InjectModel(Order.name) private orderModel: Model<Order>) { }

    async createOrder(orderToCreate: FleetOrder): Promise<FleetOrder> {
        const orderCreated = new this.orderModel(orderToCreate);
        await orderCreated.save();
        return OrderMapper.toDomain(orderCreated);
    }

    async findOrder(orderId: string): Promise<FleetOrder> {
        const fleetOrder = await this.orderModel.findById(orderId);
        return OrderMapper.toDomain(fleetOrder);
    }
}