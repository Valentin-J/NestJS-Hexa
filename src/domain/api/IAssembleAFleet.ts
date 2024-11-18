import { Fleet } from "../models/Fleet";

export interface IAssembleAFleet {
    forPassengers(numberOfPassengers: number): Promise<Fleet>;
}

export const IAssembleAFleet = Symbol("IAssembleAFleet");