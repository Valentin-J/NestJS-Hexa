import { SwapiStarship } from "./SwapiStarship"

export interface SwapiResponse {
    count: number
    next: string
    previous: any
    results: SwapiStarship[]
}