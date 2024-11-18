import { Starship } from "../models/Starship";

export interface IStarshipInventory {
    starships(): Promise<Starship[]>;
}

export const IStarshipInventory = Symbol("IStarshipInventory");