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
                    <View style={styles.imageContainer}>
                        <Image
                            source={require("../../../images/roland-logo.png")}
                            style={styles.image}
                            resizeMode="contain"/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL("https://www.herminepatisserie.be/")}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require("../../../images/hermine-logo.png")}
                            style={styles.image}
                            resizeMode="contain"/>
                    </View>
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
    imageContainer: {
        borderRadius: 9,
        overflow: "hidden"
    },
    image : {
        width: 100,
        height: 50,
        backgroundColor: ColorConstants.whiteMainColor
    }
})

export type { PartnersProps }

export default Partners