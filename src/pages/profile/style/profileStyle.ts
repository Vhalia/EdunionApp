import { StyleSheet } from "react-native";
import { ColorConstants } from "../../../constants/ThemeConstants";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        width: "100%",
        backgroundColor: ColorConstants.blackMainColor,
    },
    button: {
        marginBottom: 10,
        width: "90%",
    },
    profileButton : {
        marginBottom: 20,
        marginTop: 20,
        width: "90%",
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorConstants.blackSecondaryColor,
        height: 100,
        width: "100%",
    }
})

export default styles;