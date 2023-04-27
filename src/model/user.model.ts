export interface User {    
    id: number,
    fullname: string,   // 
    age: number,//
    peopleQt: number,//
    wantsToPay: number,//
    antecipateRents: number,//
    hasKids: boolean,//
    hasPets: boolean,//
    hasDocs: boolean,//
    alreadyInSpain: boolean,
    contacts: UserContact,
    documents?: UserDocument[],    
}

export interface UserDocument {
    id: number
    file: File,
    name: string,
    date: Date,
}

export interface UserContact {    
    cel: string,
    email:string,
    tel?: string,
    instagram?:string,
    facebook?:string,
    linkedin?:string,
}