import { StyleSheet } from "react-native";
import { ColorConstants } from "../../../constants/ThemeConstants";

const styles = StyleSheet.create({
    mainContainer: {
        display: "flex",
        flex: 1, 
        backgroundColor: ColorConstants.blackMainColor,
    },
    contentContainer: {
        display: "flex",
        flex: 1,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: ColorConstants.greyMainColor,
        marginTop: 30,
        marginRight: 10,
        marginLeft: 10,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    backButtonContainer: {
        display: "flex",
        flexDirection: "row",
        width: 40,
        height: 40,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    backButtonContainerFullscreen : {
        display: "flex",
        flexDirection: "row",
        width: 50,
        height: 50,
        justifyContent: "flex-start",
        alignItems: "center",
        marginRight: 20,
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 5
    },
    backButtonContainerAbsolute: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,
        padding: 30,
    }
})

export default styles;