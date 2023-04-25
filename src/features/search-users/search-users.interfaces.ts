export interface SearchFields {
    save: boolean,

    age: { from: number, to: number },

    peopleQt: { from: number, to: number },

    wantsToPay: { from: number, to: number },

    antecipateRents: { from: number, to: number },

    hasPets: number,
    hasKids: number,
    hasDocs: number,
    alreadyInSpain: number,
}