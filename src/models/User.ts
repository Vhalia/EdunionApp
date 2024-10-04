import { Contact } from "./Contacts"
import School from "./School"
import UserPaymentInformation from "./UserPaymentInformation"
import EUserRole from "./enums/EUserRole"
import EUserState from "./enums/EUserState"

export default interface User {
    id: number,
    firstName: string,
    lastName: string,
    description: string,
    email: string,
    picturePath?: string
    school: School,
    schoolYear? : number,
    contacts?: Contact[],
    state: EUserState,
    role: EUserRole,
    isDeleted: boolean,
    creationDate: Date,
    paymentInformation?: UserPaymentInformation,
}