import { ImageStyle, StyleProp, ViewStyle } from "react-native";

export default interface PhotoUploaderProps{
    style?: StyleProp<ViewStyle>,
    photoContainerStyle?: StyleProp<ViewStyle>,
    photoStyle? : StyleProp<ImageStyle>,
    maxPhoto?: number,
    photos?: string[],
    OnAddPhoto ? : (photoUri: string) => void
}