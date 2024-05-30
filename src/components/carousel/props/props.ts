import { StyleProp, ViewStyle } from "react-native";
import Post from "../../../models/Post";
import CarouselItemProps from "../carouselItem/props/props";

export default interface CarouselProps {
    items: Post[],
    style? : StyleProp<ViewStyle>,
    onPressItem? : (item: Post, index: number) => void
}