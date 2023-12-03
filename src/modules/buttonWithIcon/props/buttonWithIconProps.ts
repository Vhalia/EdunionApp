import { StyleProp, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";

export default interface ButtonWithIconProps {
    text? : string,
    icon : React.FC<SvgProps>,
    iconStyle? : SvgProps,
    onPress : () => void,
    style: StyleProp<ViewStyle>
}

