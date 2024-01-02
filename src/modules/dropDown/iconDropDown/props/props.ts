import { ReactElement } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import IconDropdownElement from "../IconDropdownElement";

interface IIconDropDownProps {
    children : ReactElement<IIconDropdownElementProps> | ReactElement<IIconDropdownElementProps>[],
    style? : StyleProp<ViewStyle>
}

interface IIconDropdownElementProps {
    icon : ReactElement,
    text? : string,
    textStyle? : StyleProp<TextStyle>,
    containerStyle? : StyleProp<ViewStyle>
}

export type {IIconDropDownProps, IIconDropdownElementProps}