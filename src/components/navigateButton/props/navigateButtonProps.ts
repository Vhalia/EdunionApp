import { NavigationProp } from "@react-navigation/native";
import { StyleProp, ViewStyle } from "react-native";

export default interface NavigateButtonProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>
    redirectScreenName: string
}