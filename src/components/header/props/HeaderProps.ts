import { ReactElement } from "react";
import { StyleProp, ViewStyle } from "react-native";

export default interface HeaderProps {
    children? : ReactElement | ReactElement[],
    style? : StyleProp<ViewStyle>
}