import { TextStyle } from "react-native";

export default interface MainTextProps {
    fontSize : number,
    weight? : TextStyle["fontWeight"],
    text: string
}