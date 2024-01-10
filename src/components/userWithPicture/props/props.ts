import { StyleProp, ViewStyle } from "react-native"

export default interface UserWithPictureProps {
    userName: string,
    picture?: any
    extraText? : string,
    style?: StyleProp<ViewStyle>
}