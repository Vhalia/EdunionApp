import { StyleProp, ViewStyle } from "react-native";
import { Contact } from "../../../models/Contacts";

export default interface UserContactProps {
    contacts: Contact[],
    iconSize?: number,
    style?: StyleProp<ViewStyle>
}