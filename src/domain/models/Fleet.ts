import { Starship } from './Starship';

export class Fleet {
    starships: Starship[];

    constructor(starships: Starship[]) {
        this.starships = starships;
    }
}
