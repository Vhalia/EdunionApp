import { StyleSheet } from "react-native";
import { ColorConstants } from "../../../constants/ThemeConstants";

const styles = StyleSheet.create({
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent:"center",
        alignItems: "center",
        flex: 1,
        borderRadius: 8
    },
    imageContainer : {
        display: "flex",
        flex: 3,
        width: "100%",
        justifyContent: "flex-end",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    gradientIfNoImage: {
        height: 300,
        width: '100%',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    infoBarContainer: {
        display: "flex",
        flexDirection: "row",
        backgroundColor:ColorConstants.blackSecondaryColor,
        width: "100%",
        height: 100,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        justifyContent: "flex-start",
        paddingLeft: 10,
        alignItems: "center"
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
        height: 230,
        borderRadius: 14
    }
})

export default styles;