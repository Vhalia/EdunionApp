import { StyleProp, TextStyle, ViewStyle } from "react-native"

interface FormProps {
    inputConfig : InputConfiguration[],
    buttonTitle : string,
    onSubmit : (submitResults : SubmitResult[]) => void, 
    textStyle?: StyleProp<TextStyle>,
    inputStyle?: StyleProp<TextStyle>,
    style?: StyleProp<ViewStyle>
}

interface InputConfiguration {
    title?: string,
    placeholder?: string
    secret?: boolean
}

interface SubmitResult {
    title: string,
    value: string
}

export type {FormProps, InputConfiguration as InputOptions, SubmitResult}