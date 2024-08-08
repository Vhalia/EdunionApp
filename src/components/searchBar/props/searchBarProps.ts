import { StyleProp, ViewStyle } from "react-native";

export default interface SearchBarProps {
    onPressSearch : (value: string) => void
    dropDownStyle? : StyleProp<ViewStyle>
    style? : StyleProp<ViewStyle>
    sideButtonMode?: 'dropdown' | 'button',
    onPressSideButton? : () => void,
    search?: string
}