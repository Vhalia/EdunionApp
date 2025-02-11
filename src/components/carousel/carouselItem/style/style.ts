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
        justifyContent: "flex-end",
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14
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
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: 20
    },
    gradiantStyle : {
        height: 300
    },
    ownerContainer : {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "flex-end",
        position: "absolute",
        bottom: -1
    },
    carouselImageContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: 300,
        borderRadius: 14
    }
})

export default styles;