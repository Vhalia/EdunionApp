import { Image, View } from "react-native";
import MainText from "../../modules/text/MainText";
import UserWithPictureProps from "./props/props";
import styles from "./style/style";
import FastImage from "react-native-fast-image";

const UserWithPicture = (props: UserWithPictureProps) => {
    return(
        <View style={[props.style, styles.container]}>
            <FastImage
                source={props.picture ? {uri: props.picture} : require("../../../images/defaultProfilePicture.png")}
                style={[styles.imageStyle, {width: props.pictureSize ?? 50, height: props.pictureSize ?? 50}]}
                resizeMode="cover"/>
            <View
                style={[styles.textsContainer,(!props.extraText ? styles.textsContainerWhenAlone : styles.textsContainerWhenMultiple)]}>
                <MainText 
                    fontSize={props.userNameFontSize ?? 20}
                    weight={"700"}
                    text={props.userName}/>
                {props.extraText ? <MainText 
                    fontSize={props.extraTextFontSize ?? 15}
                    weight={"500"}
                    text={props.extraText}
                    style={styles.extraTextStyle}/>
                    : ""}
            </View>
        </View>
    );
}

export default UserWithPicture;