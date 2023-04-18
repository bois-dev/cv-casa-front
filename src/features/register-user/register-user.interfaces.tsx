import { User } from "../../model/user.model";
export {}

export interface SliceProps {
    current: User,
    onCurrentChange: (user: User) => Promise<any>
}

export const stepLabels = ["Informacion basica", "Documentos", "Resumo y Concluir"]

export const enum steps {
    BasicInfo,
    Documents,
    Summary
}