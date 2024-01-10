import { Image, ImageBackground, Text, View } from "react-native";
import CarouselItemProps from "./props/props";
import styles from "./style/style";
import MainText from "../../../modules/text/MainText";
import LinearGradient from "react-native-linear-gradient";
import UserWithPicture from "../../userWithPicture/UserWithPicture";

const CarouselItem = (props: CarouselItemProps) => {
    const price = props.price ? props.price : 0;

    return (
        <View style={styles.mainContainer}>
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
                        picture={props.ownerImage}/>
                        
                </LinearGradient>

            </ImageBackground>
            
            <View style={styles.infoBarContainer}>
                <View>
                    <MainText 
                        fontSize={20}
                        weight={"700"}
                        text={props.title}/>
                    {props.subtitle ?
                        <MainText 
                            fontSize={15}
                            weight={"500"}
                            text={props.subtitle as string}
                            style={{opacity:0.7}}
                            />
                        : ""}
                </View>
                <MainText
                    fontSize={22}
                    weight={"700"}
                    text={price+" €"}/>
            </View>
        </View>
    );
}

export default CarouselItem;