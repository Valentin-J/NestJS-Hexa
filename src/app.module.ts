import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './configs/configuration';
import { HttpConfig } from './configs/http.configuration';
import { FleetAssembler } from './domain/api/FleetAssembler';
import { IAssembleAFleet } from './domain/api/IAssembleAFleet';
import { IFleetOrder } from './domain/spi/IFleetOrder';
import { IPublish } from './domain/spi/IPublish';
import { IStarshipInventory } from './domain/spi/IStartshipInventory';
import { OrderRepository } from './infrastructure/orders/repository/OrderRepository';
import { PubSubService } from './infrastructure/orders/services/pubsub.service';
import { RescueFleetController } from './infrastructure/rescue-fleet/controller/rescue-fleet.controller';
import { SwapiClient } from './infrastructure/rescue-fleet/swapi/SwapiClient';
import { Order, OrderSchema } from './infrastructure/orders/models/Order';
import { OrderController } from './infrastructure/orders/controller/order.controller';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpConfig,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
    }),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [RescueFleetController, OrderController],
  providers: [
    {
      provide: IAssembleAFleet,
      useClass: FleetAssembler
    },
    {
      provide: IStarshipInventory,
      useClass: SwapiClient
    },
    {
      provide: IFleetOrder,
      useClass: OrderRepository
    },
    {
      provide: IPublish,
      useClass: PubSubService
    }
  ],
})
export class AppModule { }
