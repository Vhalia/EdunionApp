import { StyleSheet } from "react-native";
import { ColorConstants } from "../../../../constants/ThemeConstants";

const style = StyleSheet.create({
    container : {
        display: "flex",
        flex: 1,
        backgroundColor: ColorConstants.greyMainColor,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    header : {
        justifyContent: "center",
        alignItems: "center"
    }
})

export default style;