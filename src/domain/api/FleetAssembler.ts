import { Inject, Injectable } from "@nestjs/common";
import { Fleet } from "../models/Fleet";
import { Starship } from "../models/Starship";
import { IStarshipInventory } from "../spi/IStartshipInventory";
import { IAssembleAFleet } from "./IAssembleAFleet";

@Injectable()
export class FleetAssembler implements IAssembleAFleet {

    constructor(
        @Inject(IStarshipInventory)
        private readonly startshipInventory: IStarshipInventory,
    ) { }

    async forPassengers(numberOfPassengers: number): Promise<Fleet> {
        const starships = this.getStarshipsHavingPassengersCapacity();
        const rescueStarships = await this.selectStarships(numberOfPassengers, starships);
        return new Fleet(rescueStarships);
    }

    private async getStarshipsHavingPassengersCapacity(): Promise<Starship[]> {
        const inventory = await this.startshipInventory.starships();
        return inventory
            .filter(el => el.capacity > 0)
            .sort((a: Starship, b: Starship) => a.capacity - b.capacity);
    }

    private selectStarships(numberOfPassengers: number, starships: Promise<Starship[]>): Promise<Starship[]> {
        const rescueStarships: Starship[] = [];

        return starships.then((starshipList: Starship[]) => {
            while (numberOfPassengers > 0) {
                var starship: Starship = starshipList.shift();
                numberOfPassengers = numberOfPassengers - starship.capacity;
                rescueStarships.push(starship);
            }

            return rescueStarships;
        });
    }
}



