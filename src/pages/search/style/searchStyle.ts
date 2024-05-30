import { StyleSheet } from "react-native";
import { ColorConstants } from "../../../constants/ThemeConstants";

const styles = StyleSheet.create({
    mainContainer:{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        backgroundColor: ColorConstants.blackMainColor,
    },
    header: {
        backgroundColor: ColorConstants.blackSecondaryColor
    },
    seachBarStyle: {
        marginTop: 50,
        marginLeft: 20,
        marginRight: 20,
    },
    seachBarStyleContainer: {
        flexGrow: 1,
    },
    contentContainer: {
        display: "flex",
        flexDirection: "column",
        flex: 5,
        alignItems: "center",
    },
    postsListContainer: {
        flex : 1,
        flexGrow: 1,
        width: 380,
        marginBottom : 5
    },
    postElement: {
        height: 300,
        width: 185,
        margin: 2
    },
    gap: {
        marginTop: 10
    }
})

export default styles;