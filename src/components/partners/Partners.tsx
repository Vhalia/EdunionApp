import { Image, Linking, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { ColorConstants } from "../../constants/ThemeConstants"
import MainText from "../../modules/text/MainText"

const Partners = (props: PartnersProps) => {
    return (
        <View style={[styles.mainContainer, props.style]}>

            <MainText 
                text="Nos partenaires"
                fontSize={20}
                weight="bold"
                style={styles.title}/>

            <View style={[styles.imagesContainer]}>
                <TouchableOpacity onPress={() => Linking.openURL("https://boucherie-roland.be/")}>
                    <Image
                        source={require("../../../images/roland-logo.png")}
                        style={styles.image}
                        resizeMode="contain"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL("https://www.herminepatisserie.be/")}>
                    <Image
                        source={require("../../../images/hermine-logo.png")}
                        style={styles.image}
                        resizeMode="contain"/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

interface PartnersProps {
    style? : StyleProp<ViewStyle>
}

const styles = StyleSheet.create({
    mainContainer: {
        display: "flex",
        flex: 1,
    },
    imagesContainer: {
        alignItems: "center",
        flexWrap: "wrap",
        flexDirection: "row",
        gap: 10,
        marginLeft: 10,
        backgroundColor: ColorConstants.blackMainColor
    },
    title: {
        margin: 10,
        marginBottom: 15
    },
    image : {
        width: 100,
        height: 50,
        backgroundColor: ColorConstants.whiteMainColor,
        borderRadius: 10
    }
})

export type { PartnersProps }

export default Partners