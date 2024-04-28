import { StyleProp, ViewStyle } from "react-native"

export default interface PostCardProps {
    image?: any,
    title: string,
    subtitle?: string
    owner: string,
    ownerImage?: any
    price: number,
    gradientColors?: string[],
    style?: StyleProp<ViewStyle>,
    informationBarSyle?: StyleProp<ViewStyle>
}