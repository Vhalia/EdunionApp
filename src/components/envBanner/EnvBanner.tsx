import { StyleSheet, View } from "react-native";
import Config from "react-native-config";
import MainText from "../../modules/text/MainText";

const EnvBanner = () => {
    if (!Config.ENV || Config.ENV == 'production') {
        return <></>
    }

    return (
        <View style={style.container}>
            <MainText text={Config.ENV?.toUpperCase() ?? ''} fontSize={11}/>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 20,
        right: -20,
        width: 100,
        height: 20,
        backgroundColor: 'red',
        transform: [{rotate: '45deg'}],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'}
})

export default EnvBanner