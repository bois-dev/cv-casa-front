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
    documents: UserDocument[],
    contacts: UserContact
}

export interface UserDocument {
    id: number
    file: File,
    name: string,
    date: Date,
}

export interface UserContact {
    tel: string,
    cel: string,
    email:string,
    instagram:string,
    facebook:string,
    linkedin:string,
}