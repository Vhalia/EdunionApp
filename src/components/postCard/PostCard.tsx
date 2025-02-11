import { ImageBackground, View } from "react-native";
import PostCardProps from "./props/postCardProps";
import styles from "./style/postCardStyle";
import MainText from "../../modules/text/MainText";
import LinearGradient from "react-native-linear-gradient";
import UserWithPicture from "../userWithPicture/UserWithPicture";
import FastImage from "react-native-fast-image";

const PostCard = (props: PostCardProps) => {
    const price = props.price ? props.price : 0;
    const displayPostImage = () => {
        if (props.image){
            return (
                <View style={[styles.carouselImageContainer]}>
                    <FastImage
                        source={{uri: props.image}}
                        style={styles.imageContainer}
                        resizeMode={FastImage.resizeMode.cover}/>
                        
                    <LinearGradient
                        style={[styles.gradiantStyle, styles.ownerContainer]}
                        colors={['#00000000', '#00000000', '#00000000', '#00000000', '#000000']}>

                        <UserWithPicture 
                            userName={props.owner}
                            picture={props.ownerImage}
                            pictureSize={40}
                            userNameFontSize={15}/>
                            
                    </LinearGradient>
                </View>
            )
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
                <View style={{position: 'relative', width: '70%'}}>
                    <MainText 
                        fontSize={15}
                        weight={"700"}
                        style={{padding: 5}}
                        text={props.title.length > 30 ? props.title.replace(/(.{30})..+/, "$1 ...") : props.title}/>
                    {props.subtitle ?
                        <MainText 
                            fontSize={13}
                            weight={"500"}
                            text={props.subtitle as string}
                            style={{opacity:0.7}}
                            />
                        : ""}
                </View>
            </View>
        </View>
    );
}

export default PostCard;