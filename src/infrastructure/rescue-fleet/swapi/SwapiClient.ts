import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from "@nestjs/common";
import { AxiosError, AxiosResponse } from 'axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import { Starship } from '../../../domain/models/Starship';
import { IStarshipInventory } from '../../../domain/spi/IStartshipInventory';
import { SwapiResponse } from './models/SwapiResponse';

@Injectable()
export class SwapiClient implements IStarshipInventory {
    constructor(private readonly httpService: HttpService) { }

    private readonly logger = new Logger(SwapiClient.name);

    private readonly baseUrl: string = 'https://swapi.dev/api/starships/';

    async starships(): Promise<Starship[]> {
        var nextPage = this.baseUrl;
        return await this.nextStarships(nextPage);
    }

    private async nextStarships(nextPage: string): Promise<Starship[]> {
        if (nextPage == null) {
            return;
        }

        const starships: Starship[] = [];

        const starshipInventory = await this.getStarshipsFromSwapi(nextPage);
        this.convertSwapiResponseToStarship(starshipInventory).forEach(el => starships.push(el));
        const nextStarships = await this.nextStarships(starshipInventory.next);

        if (nextStarships) {
            starships.forEach(el => starships.push(el));
        }

        return starships;
    }

    private async getStarshipsFromSwapi(nextPage: string): Promise<SwapiResponse> {
        return await firstValueFrom(
            this.httpService
                .get<SwapiResponse>(nextPage)
                .pipe(
                    map((response: AxiosResponse) => response.data),
                    catchError((error: AxiosError) => {
                        this.logger.error(error.response.data);
                        throw 'An error happened!';
                    })
                ));
    }

    private convertSwapiResponseToStarship(swapiResponse: SwapiResponse): Starship[] {
        return swapiResponse.results.map(el => new Starship(el.name, +el.passengers));
    }
}


