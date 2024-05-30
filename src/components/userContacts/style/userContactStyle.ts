import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        flexGrow: 1,
        gap: 10
    },
   container : {
       display: "flex",
       flexDirection: "row",
    //    justifyContent: "space-between",
       alignItems: "center",
       width: "100%"
   },
   text: {
    marginLeft: 10
   }
})

export default style