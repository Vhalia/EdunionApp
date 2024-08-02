import { StyleSheet } from "react-native";
import { ColorConstants } from "../../../../../constants/ThemeConstants";

const style = StyleSheet.create({
    container : {
        display: "flex",
        flex: 1,
        backgroundColor: ColorConstants.greyMainColor,
        padding: 10
    },
    header : {
        justifyContent: "center",
        alignItems: "center"
    }
})

export default style;