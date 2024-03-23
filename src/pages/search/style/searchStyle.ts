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
        flex: 1,
        backgroundColor: ColorConstants.blackSecondaryColor,
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 20,
        paddingRight: 20,
    },
    seachBarStyle: {
        marginTop: 50
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
        width: 370,
        marginBottom : 5
    },
    postElement: {
        backgroundColor: "blue"
    },
    gap: {
        marginTop: 10
    }
})

export default styles;