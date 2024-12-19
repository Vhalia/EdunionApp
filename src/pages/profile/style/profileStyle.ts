import { StyleSheet } from "react-native";
import { ColorConstants } from "../../../constants/ThemeConstants";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: ColorConstants.blackMainColor,
    },
    button: {
        marginBottom: 10,
        width: "90%",
        borderRadius: 14
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
    },
    logoutContainer : {
        marginLeft: 40,
        width: "100%"
    },
    partnersContainer: {
        display: "flex",
        flex: 1,
        marginBottom: 80
    },
    logoutButton :{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: ColorConstants.greyMainColor,
        borderRadius: 14,
    }
})

export default styles;