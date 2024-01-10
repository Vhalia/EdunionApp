import { Image, View } from "react-native";
import MainText from "../../modules/text/MainText";
import UserWithPictureProps from "./props/props";
import styles from "./style/style";

const UserWithPicture = (props: UserWithPictureProps) => {
    return(
        <View style={[props.style, styles.container]}>
            <Image
                source={props.picture ?? require("../../../images/defaultProfilePicture.png")}
                style={styles.imageStyle}
                resizeMode="cover"
                borderRadius={55}/>
            <View
                style={[styles.textsContainer,(!props.extraText ? styles.textsContainerWhenAlone : styles.textsContainerWhenMultiple)]}>
                <MainText 
                    fontSize={20}
                    weight={"700"}
                    text={props.userName}/>
                {props.extraText ? <MainText 
                    fontSize={15}
                    weight={"500"}
                    text={props.extraText}
                    style={styles.extraTextStyle}/>
                    : ""}
            </View>
        </View>
    );
}

export default UserWithPicture;