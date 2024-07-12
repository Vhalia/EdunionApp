import { InputModeOptions, StyleProp, TextStyle, ViewStyle } from "react-native";

export default interface MainInputProps{
    containerStyle?: StyleProp<ViewStyle>,
    style?: StyleProp<TextStyle>,
    inputMode?: InputModeOptions,
    placeholder?: string,
    placeholderColor? : string,
    value?: string,
    multiline?: boolean,
    numberOfLines? : number,
    onChange?: (value: string) => void,
    onLosingFocus? : (value: string) => void,
    isSecret? : boolean,
    isOnError? : boolean,
    errorMessage? : string,
    onError? : () => void,
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined,
    keyboardType? : "email-address" | "numeric" | "phone-pad" | "default" | undefined,
    disabled? : boolean,
    isLoading? : boolean,
    maxLength? : number
}