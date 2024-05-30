import EContactType from "./enums/EContactType";

export interface Contact {
    id: number,
    type: EContactType,
    value: string
}