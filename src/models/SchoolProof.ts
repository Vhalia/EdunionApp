import Proof from "./Proof";
import School from "./School";
import User from "./User";

export default interface SchoolProof {
    id: number,
    lastModificationDate: Date,
    proof: Proof,
    user: User,
    school: School
}