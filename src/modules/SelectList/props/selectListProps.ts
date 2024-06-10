import { StyleProp, ViewStyle } from "react-native";

export default interface SelectListProps {
    style?: StyleProp<ViewStyle>,
    elementStyle?: StyleProp<ViewStyle>,
    data: string[],
    initialSelected: string,
    onSelect: (index: string) => void
    ellipseSelectedColor? : string,
    ellipseColor? : string,
    fontSize? : number,
    orientation? : "vertical" | "horizontal"
}