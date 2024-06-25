import { Contact } from "./Contacts"
import School from "./School"
import EUserState from "./enums/EUserState"

export default interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    picturePath?: string
    schoolId: number,
    contacts?: Contact[],
    state: EUserState
}