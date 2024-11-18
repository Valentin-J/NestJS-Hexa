import { Test, TestingModule } from '@nestjs/testing';
import { RescueFleetController } from './rescue-fleet.controller';
import { Starship } from '../../../domain/models/Starship';
import { FleetAssembler } from '../../../domain/api/FleetAssembler';
import { Fleet } from '../../../domain/models/Fleet';
import { IStarshipInventory } from '../../../domain/spi/IStartshipInventory';
import { IAssembleAFleet } from '../../../domain/api/IAssembleAFleet';
import * as starships from '../../../../test/mocks/starship.json';

describe('RescueFleetController', () => {
  let controller: RescueFleetController;

  beforeEach(async () => {
    const mockStarshipInventory = {
      starships: jest.fn().mockReturnValue(starships),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RescueFleetController],
      providers: [
        {
          provide: IAssembleAFleet,
          useClass: FleetAssembler
        },
        FleetAssembler, {
          provide: IStarshipInventory, 
          useValue: mockStarshipInventory
      }
    ],
    }).compile();

    controller = module.get<RescueFleetController>(RescueFleetController);
  });

  describe('rescueFleet', () => {
    it('should return 1 starship', async () => {
      // Given
      const numberOfPassengers: number = 5;

      // When
      const response: Fleet = await controller.getRescueFleet(numberOfPassengers);

      // Then
      console.log(response);
      expect(response.starships).toHaveLength(1);
      expect(response.starships).toContainEqual(new Starship("xs", 10));
    });
  });
});
