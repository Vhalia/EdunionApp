import { ImageBackground, View } from "react-native";
import PostCardProps from "./props/postCardProps";
import styles from "./style/postCardStyle";
import MainText from "../../modules/text/MainText";
import LinearGradient from "react-native-linear-gradient";
import UserWithPicture from "../userWithPicture/UserWithPicture";

const PostCard = (props: PostCardProps) => {
    const price = props.price ? props.price : 0;

    const displayPostImage = () => {
        if (props.image){
            return (
                <ImageBackground
                source={props.image}
                style={styles.imageContainer}
                resizeMode="cover"
                borderTopRightRadius={22}
                borderTopLeftRadius={22}>

                    <LinearGradient
                        style={[styles.grandiantStyle, styles.ownerContainer]}
                        colors={['#00000000', '#00000000', '#00000000', '#00000000', '#000000']}>

                        <UserWithPicture 
                            userName={props.owner}
                            picture={props.ownerImage}
                            pictureSize={40}
                            userNameFontSize={15}/>
                            
                    </LinearGradient>

                </ImageBackground>)
        }else{
            return (
                <LinearGradient
                    style={[styles.gradientIfNoImage, styles.imageContainer]}
                    colors={props.gradientColors ? props.gradientColors : []}>
                        
                        <UserWithPicture 
                            userName={props.owner}
                            picture={props.ownerImage}
                            pictureSize={40}
                            userNameFontSize={15}/>

                </LinearGradient>)
        }
    }

    return (
        <View style={[styles.mainContainer, props.style]}>
            {displayPostImage()}

            <View style={[styles.infoBarContainer, props.informationBarSyle]}>
                <View>
                    <MainText 
                        fontSize={18}
                        weight={"700"}
                        text={props.title}/>
                    {props.subtitle ?
                        <MainText 
                            fontSize={13}
                            weight={"500"}
                            text={props.subtitle as string}
                            style={{opacity:0.7}}
                            />
                        : ""}
                </View>
                <MainText
                    fontSize={20}
                    weight={"700"}
                    text={price+" €"}/>
            </View>
        </View>
    );
}

export default PostCard;