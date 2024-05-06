import { InputModeOptions, StyleProp, TextStyle } from "react-native";

export default interface MainInputProps{
    style?: StyleProp<TextStyle>,
    inputMode?: InputModeOptions,
    placeholder?: string,
    placeholderColor? : string,
    value?: string,
    multiline?: boolean,
    numberOfLines? : number,
    onChangeText?: (value: string) => void
}