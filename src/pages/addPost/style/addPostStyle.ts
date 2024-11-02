import { StyleSheet } from "react-native";
import { ColorConstants } from "../../../constants/ThemeConstants";

const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flexDirection: "column",
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: ColorConstants.blackMainColor,
    },
    header : {
        display: 'flex',
        flex : 0.15,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorConstants.blackSecondaryColor
    },
});

export default styles;