import { StyleProp, ViewStyle } from "react-native"

export default interface MainButtonProps {
    text: string,
    fontSize?: number,
    fontWeight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | 'bold' | 'normal' | undefined,
    fontColor? : string,
    onPress: () => void,
    style? : StyleProp<ViewStyle>,
    disabled? : boolean,
    isLoading? : boolean
}