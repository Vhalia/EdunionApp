import { StyleSheet } from "react-native";
import { ColorConstants } from "../../../../constants/ThemeConstants";

const styles = StyleSheet.create({
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent:"center",
        alignItems: "center",
        flex: 1,
        borderRadius: 22
    },
    imageContainer : {
        display: "flex",
        flex: 3,
        width: "100%",
        justifyContent: "flex-end"
    },
    gradientIfNoImage: {
        height: 300,
        width: '100%',
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22
    },
    infoBarContainer: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        backgroundColor:ColorConstants.blackSecondaryColor,
        width: "100%",
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22,
        justifyContent: "space-around",
        alignItems: "center"
    },
    grandiantStyle : {
        height: 300
    },
    ownerContainer : {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "flex-end",
        padding: 10
    }
})

export default styles;