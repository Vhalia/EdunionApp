import { ReactElement } from "react";
import { StyleProp, ViewStyle } from "react-native";

export default interface IIconDropDownProps {
    children : ReactElement[],
    style? : StyleProp<ViewStyle>
}