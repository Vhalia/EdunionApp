import { StyleSheet } from "react-native";
import { ColorConstants } from "../../../constants/ThemeConstants";

const styles = StyleSheet.create({
    mainContainer:{
        display: "flex",
        flexDirection: "column",
        flex: 1
    },
    header: {
        flex: 0.15,
        backgroundColor: ColorConstants.blackSecondaryColor,
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 20,
        paddingRight: 20,
    },
    seachBarStyle: {
        marginTop: 50
    }
})

export default styles;