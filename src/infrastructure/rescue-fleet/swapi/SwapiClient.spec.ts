import { HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { of } from 'rxjs';
import * as starshipsP1 from '../../../../test/mocks/swapi-starships-page1.json';
import { SwapiClient } from './SwapiClient';
import { Starship } from '../../../domain/models/Starship';
import { SwapiResponse } from './models/SwapiResponse';

describe('SwapiClient', () => {
    let swapiClient: SwapiClient;
    let httpService: HttpService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                SwapiClient,
                {
                    provide: HttpService,
                    useValue: {
                        get: jest.fn(),
                    },
                },
            ],
        }).compile();

        swapiClient = moduleRef.get<SwapiClient>(SwapiClient);
        httpService = moduleRef.get<HttpService>(HttpService);
    });

    describe('inventory', () => {
        it('should return the starship inventory', async () => {
            // Given
            const mockResponse: AxiosResponse<SwapiResponse> = {
                data: starshipsP1,
                headers: {} as AxiosRequestHeaders,
                config: { url: 'https://swapi.dev/api/starships/', headers: {} as AxiosRequestHeaders },
                status: 200,
                statusText: 'OK',
            };

            jest
                .spyOn(httpService, 'get')
                .mockImplementationOnce(() => of(mockResponse));

            // When
            const swapiResponse: Starship[] =  await swapiClient.starships();

            // Then
            console.log(swapiResponse);
            expect(swapiResponse).toHaveLength(10);
            expect(swapiResponse).toContainEqual(new Starship("CR90 corvette", 600));
            expect(swapiResponse).toContainEqual(new Starship("Millennium Falcon", 6));
            expect(swapiResponse).toContainEqual(new Starship("Death Star", 843342));
        });
    });
});
