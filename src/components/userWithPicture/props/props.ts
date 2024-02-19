import { StyleProp, ViewStyle } from "react-native"

export default interface UserWithPictureProps {
    userName: string,
    userNameFontSize?: number,
    picture?: any
    pictureSize?: number,
    extraText? : string,
    extraTextFontSize?: number,
    style?: StyleProp<ViewStyle>
}