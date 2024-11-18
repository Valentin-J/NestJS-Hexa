import { Test } from '@nestjs/testing';
import { Fleet } from '../models/Fleet';
import { Starship } from '../models/Starship';
import { FleetAssembler } from "./FleetAssembler";
import { IAssembleAFleet } from "./IAssembleAFleet";
import { IStarshipInventory } from '../spi/IStartshipInventory';
import * as starships from '../../../test/mocks/starship.json';

describe('AssembleAFleet', () => {
    let assembleAFleet: IAssembleAFleet;

    beforeEach(async () => {
        const mockStarshipInventory = {
            starships: jest.fn().mockReturnValue(starships),
        };

        const moduleRef = await Test.createTestingModule({
            providers: [
                FleetAssembler, {
                    provide: IStarshipInventory, useValue: mockStarshipInventory
                }
            ],
        }).compile();

        assembleAFleet = moduleRef.get<IAssembleAFleet>(FleetAssembler);
    });

    describe('shouldAssembleAFleetFor1050Passengers', () => {
        it('should assemble the fleet for 1050 passengers', async () => {
            // Given
            const numberOfPassengers: number = 1050;

            // When
            const fleet: Fleet = await assembleAFleet.forPassengers(numberOfPassengers);

            // Then
            console.log(fleet);
            expect(fleet.starships).toHaveLength(4);
            expect(fleet.starships).toContainEqual(new Starship("xs", 10));
            expect(fleet.starships).toContainEqual(new Starship("s", 50));
            expect(fleet.starships).toContainEqual(new Starship("m", 200));
            expect(fleet.starships).toContainEqual(new Starship("l", 800));

            let maxCapacity: number = 0;
            fleet.starships.forEach(element => {
                maxCapacity += element.capacity
            });

            expect(maxCapacity).toBeGreaterThan(numberOfPassengers);
        });
    });
});