import { Contact } from "./Contacts"
import School from "./School"

export default interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    picturePath?: string
    school: School,
    contacts?: Contact[]
}