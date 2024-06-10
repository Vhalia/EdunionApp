import { StyleSheet } from "react-native";
import { ColorConstants } from "../../../constants/ThemeConstants";

const styles = StyleSheet.create({
    container : {
        display: "flex",
        flex: 1
    },
    element: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
        padding: 10,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: ColorConstants.blackMainColor,
        borderRadius : 10
    },
})

export default styles;