export interface SearchFields {
    save : boolean,
    
    age: { from: number, to: number },

    peopleQtFrom: number,
    peopleQtTo: number,

    wantsToPayFrom: number,
    wantsToPayTo: number,

    antecipateRentsFrom: number,
    antecipateRentsTo: number,

    hasPets: number,
    hasKids: number,
    hasDocs: number,
    alreadyInSpain: number,        
}