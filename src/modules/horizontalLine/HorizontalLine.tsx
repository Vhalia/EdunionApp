import { View } from "react-native";
import HorizontalLineProps from "./props/horizontalLineProps";
import styles from "./style/horizontalLineStyle";

const HorizontalLine = (props : HorizontalLineProps) => {
    let color = props.color ?? "white";

    return (
        <View style={[{borderBottomColor: color, opacity: props.opacity ?? 0.5}, styles.horizontalLine, props.styles]}>
        </View>
    );
};

export default HorizontalLine;