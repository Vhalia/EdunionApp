import { ImageStyle, StyleProp, ViewStyle } from "react-native";
import File from "../../../models/File";

export default interface PhotoUploaderProps{
    style?: StyleProp<ViewStyle>,
    photoContainerStyle?: StyleProp<ViewStyle>,
    photoStyle? : StyleProp<ImageStyle>,
    maxPhoto?: number,
    photos?: File[],
    OnAddPhoto ? : (photo: File) => void,
    OnDeletePhoto ? : (photo: File) => void,
    isLoading ? : boolean
}