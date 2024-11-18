import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IAssembleAFleet } from '../../../domain/api/IAssembleAFleet';
import { Fleet } from '../../../domain/models/Fleet';

@Controller('rescueFleets')
@ApiTags('Rescue Fleet')
export class RescueFleetController {

    constructor(
        @Inject(IAssembleAFleet)
        private readonly assembleAFleet: IAssembleAFleet
    ) { }

    @Post()
    @ApiOperation({ summary: 'Get rescue fleet for given number of passengers' })
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
        description: 'The fleet',
        type: Fleet,
    })
    async getRescueFleet(@Body('passengers') passengers: number): Promise<Fleet> {
        return this.assembleAFleet.forPassengers(passengers);
    }
}
