import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer : {
        position: "relative"
    },
    navigationArrows : {
        display: "flex",
        flexDirection: "row",
        width: "100%",
    },
    navigationArrowsInside : {
        position: "absolute",
        top: "50%",
        left: "5%",
        width: "90%",
    },
    navigationArrowsCenter : {
        justifyContent: "space-between",
        alignItems: "center",
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    paginationContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5,
        marginTop: 10
    },
    paginationInside : {
        position: "absolute",
        bottom: "5%",
        width: "100%"
    }
})

export default styles;