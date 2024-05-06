import School from "./School"

export default interface User {
    id: number,
    name: string,
    lastname: string,
    email: string,
    picture?: string
    School: School
}