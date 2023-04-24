import { User } from "../../model/user.model";
export {}

export interface SliceProps {
    current: User,
    onCurrentChange: (user: User) => Promise<any>
}

export const stepLabels = ["Informacion basica", "Contactos", "Documentos", "Resumo y Concluir"]

export const enum steps {
    BasicInfo,    
    Contacts,
    Documents,
    Summary
}

export interface AddDocument {
    name: string,
    content: File
}