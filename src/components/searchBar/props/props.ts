import { StyleProp, ViewStyle } from "react-native";

export default interface SearchBarProps {
    onPressSearch : (value: string) => void,
    style? : StyleProp<ViewStyle>
}