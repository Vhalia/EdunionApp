import { StyleProp, ViewStyle } from "react-native";

export default interface SelectListProps {
    style?: StyleProp<ViewStyle>,
    elementStyle?: StyleProp<ViewStyle>,
    data: string[],
    onSelect: (index: number) => void
    ellipseSelectedColor? : string,
    ellipseColor? : string,
    fontSize? : number,
}