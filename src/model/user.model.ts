export interface User {
    fullname: string,
    age: number,
    peopleQt: number,
    wantsToPay: number,
    antecipateRents: number,
    hasKids: boolean,
    hasPets: boolean,
    hasDocs: boolean,
    alreadyInSpain: boolean,
    documents: UserDocument[]
}

export interface UserDocument {
    id: number
    file: File,
    name: string,
    date: Date,
}