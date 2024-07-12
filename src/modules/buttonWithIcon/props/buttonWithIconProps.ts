import { ReactElement } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";

export default interface ButtonWithIconProps {
    children : ReactElement | ReactElement[],
    iconStyle? : SvgProps,
    onPress : () => void,
    containerStyle? : StyleProp<ViewStyle>,
    style?: StyleProp<ViewStyle>,
    underlayColor?: string
}

