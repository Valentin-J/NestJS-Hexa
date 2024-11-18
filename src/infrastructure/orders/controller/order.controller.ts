import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FleetOrder } from '../../../domain/models/FleetOrder';
import { IFleetOrder } from '../../../domain/spi/IFleetOrder';
import { Order } from '../models/Order';
import OrderMapper from '../mappers/order.mapper';

@Controller('orders')
@ApiTags('Orders')
export class OrderController {

    constructor(
        @Inject(IFleetOrder)
        private readonly orderRepository: IFleetOrder
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create an order to rescue people' })
    @ApiBody({
        type: Number,
        description: 'Number of passengers to rescue',
        examples: {
            example: {
                summary: 'passengers',
                description: 'Number of passengers to rescue',
                value: '5',
            },
        },
        required: true,
        isArray: false,
    })
    @ApiResponse({
        status: 200,
        description: 'The order created',
        type: Order,
    })
    async getRescueFleet(@Body() order: Order): Promise<FleetOrder> {
        return this.orderRepository.createOrder(OrderMapper.toDomain(order));
    }
}
