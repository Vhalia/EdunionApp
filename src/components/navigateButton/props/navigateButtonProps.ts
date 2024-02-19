import { StyleProp, ViewStyle } from "react-native";

export default interface NavigateButtonProps {
    onPress: () => void;
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>
}