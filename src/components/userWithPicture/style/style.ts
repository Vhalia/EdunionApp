import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row"
    },
    imageStyle: {
        margin: 10
    },
    textsContainer: {
        display: "flex",
        flexDirection: "column",
    },
    textsContainerWhenMultiple: {
        marginTop: 10
    },
    textsContainerWhenAlone: {
        justifyContent: "center"
    },
    extraTextStyle: {
        opacity: 0.5
    }
})

export default styles