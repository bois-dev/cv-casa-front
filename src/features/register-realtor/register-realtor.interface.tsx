import { Realtor } from "../../model/realtor.model"

export {}

export interface SliceProps {
    current: Realtor,
    onCurrentChange: (user: Realtor) => Promise<any>
}

export const stepLabels = ["Informacion basica"]

export const enum steps {
    BasicInfo,
}