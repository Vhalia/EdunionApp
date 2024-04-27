import { StyleSheet } from "react-native";
import { ColorConstants } from "../../../constants/ThemeConstants";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        padding: 10,
        backgroundColor: ColorConstants.blackSecondaryColor,
        width : 350,
        borderRadius: 14,
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    photo: {
        width: 70,
        height: 70,
        margin: 5,
        borderRadius: 8,
        backgroundColor: ColorConstants.greyMainColor,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default styles;