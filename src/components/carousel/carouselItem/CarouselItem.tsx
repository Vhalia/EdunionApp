import { Image, ImageBackground, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import CarouselItemProps from "./props/props";
import styles from "./style/style";
import MainText from "../../../modules/text/MainText";
import LinearGradient from "react-native-linear-gradient";
import UserWithPicture from "../../userWithPicture/UserWithPicture";
import { getRandomInt } from "../../../utils/utils";
import FastImage from "react-native-fast-image";

const CarouselItem = (props: CarouselItemProps) => {
    const price = props.price ? props.price : 0;

    const displayCarouselImage = () => {
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
                            picture={props.ownerImage}/>
                            
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
                            picture={props.ownerImage}/>

                </LinearGradient>)
        }
    }

    return (
        <TouchableOpacity
            style={styles.mainContainer}
            activeOpacity={0.8}
            onPress={props.onPress}>
            
            {displayCarouselImage()}

            <View style={styles.infoBarContainer}>
                <View>
                    <MainText 
                        fontSize={20}
                        weight={"700"}
                        text={props.title.length > 40 ? props.title.replace(/(.{40})..+/, "$1 ...") : props.title}/>
                    {props.subtitle ?
                        <MainText 
                            fontSize={15}
                            weight={"500"}
                            text={props.subtitle as string}
                            style={{opacity:0.7}}
                            />
                        : ""}
                </View>

            </View>
        </TouchableOpacity>
    );
}

export default CarouselItem;