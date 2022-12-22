export enum Rating {
    SSS,
    SS,
    S,
    AAA,
    AA,
    A,
    B,
    C,
    D,
    F,
    NoData
}

export interface Combo {
    startTick: number
    endTick: number
    length: number
}

export interface GameplayResults {
    points: number
    perfect: number
    great: number
    good: number
    miss: number
    rating: Rating
    combos: Combo[]
    songId: string
}