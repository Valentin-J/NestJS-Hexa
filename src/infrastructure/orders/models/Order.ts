import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";
import { Fleet } from "../../../domain/models/Fleet";

@Schema()
export class Order {
    @Prop({ type: SchemaTypes.ObjectId })
    id: Types.ObjectId

    @Prop()
    fleet: Fleet;

    @Prop()
    numberOfPassengers: number;

    @Prop()
    orderDate: Date;
}

export type OrderDocument = HydratedDocument<Order>;

export const OrderSchema = SchemaFactory.createForClass(Order);