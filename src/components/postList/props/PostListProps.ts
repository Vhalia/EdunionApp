import { StyleProp, ViewStyle } from "react-native";
import Post from "../../../models/Post";

export default interface PostListProps {
    posts: Post[],
    onPress: (post: Post) => void,
    style?: StyleProp<ViewStyle>
    itemStyle?: StyleProp<ViewStyle>
}