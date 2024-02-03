import { ReactElement } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SharedValue } from "react-native-reanimated";

export default interface FoldHeaderProps {
    baseHeight?: number,
    minHeight?: number,
    maxHeight?: number,
    swipeProgress: SharedValue<number>,
    children? : ReactElement | ReactElement[],
    style? : StyleProp<ViewStyle>
}