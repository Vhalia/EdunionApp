import { StyleSheet } from "react-native";
import { ColorConstants } from "../../../constants/ThemeConstants";

const styles = StyleSheet.create({
    mainContainer: {
        display: "flex",
        flex: 1,
        backgroundColor: ColorConstants.blackMainColor,
    },
    container: {
        display: "flex",
        flex: 1,
        backgroundColor: ColorConstants.blackMainColor,
        alignItems: "center",
        marginLeft: 20,
        marginRight: 20,
        gap: 10
    },
    contentContainer: {
        display: "flex",
        padding: 10,
        borderRadius: 14,
        backgroundColor: ColorConstants.blackSecondaryColor
    },
    input: {
        color: ColorConstants.whiteMainColor,
        backgroundColor: ColorConstants.blackSecondaryColor,
        width: "100%"
    },
    buttonContainer: {
        display: "flex",
        gap: 10
    },
    loginButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: ColorConstants.purpleMainColor,
        padding: 10,
        width: 350,
        marginTop: 50
    },
    registerButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: ColorConstants.purpleDark,
        padding: 10,
        width: 350,
    },
    resetPasswordButton: {
        display: "flex",
        width: 350,
    }
});

export default styles;