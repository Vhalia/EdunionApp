import { Contact } from "./Contacts"
import School from "./School"
import EUserState from "./enums/EUserState"

export default interface User {
    id: number,
    firstName: string,
    lastName: string,
    description: string,
    email: string,
    picturePath?: string
    schoolId: number,
    schoolYear? : number,
    contacts?: Contact[],
    state: EUserState
}