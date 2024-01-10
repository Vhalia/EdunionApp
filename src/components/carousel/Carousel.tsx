import { Dimensions, Image, Text, View } from "react-native";
import CarouselProps from "./props/props"
import Carousel from "react-native-reanimated-carousel";
import React, { useState } from "react";
import styles from "./style/style";
import CarouselPagination from "./carouselPagination/CarouselPagination";
import Animated, { useSharedValue } from "react-native-reanimated";
import CarouselItem from "./carouselItem/CarouselItem";
import MainText from "../../modules/text/MainText";

const Carousels = (props: CarouselProps) => {
    const progressValue = useSharedValue(0);
    const [activePaginationIndex, setActivePaginationIndex] = useState(0);

    const determineActivePagination = () => {
        let index = Math.round(progressValue.value)
        if (index > props.items.length - 1)
            index = 0;

        setActivePaginationIndex(index)
    }

    return (
        <View
            style={[styles.carouselContainer, props.style]}>

            <Carousel
                style={styles.carousel}
                loop={true}
                data={props.items}
                width={Dimensions.get("window").width}
                height={Dimensions.get("window").width}
                mode="parallax"
                snapEnabled
                onSnapToItem={determineActivePagination}
                onScrollBegin={determineActivePagination}
                modeConfig={{
                    parallaxScrollingScale: 0.65,
                    parallaxScrollingOffset: 90,
                    parallaxAdjacentItemScale: 0.65
                }}
                panGestureHandlerProps={{
                    //prevent sliding issue when used in scrollview
                    activeOffsetX: [-10, 10]
                }}
                onProgressChange={(_, absoluteProgress) => {
                        const roundedProgress = Math.round(absoluteProgress*10)/10
                        progressValue.value = roundedProgress
                    }
                }
                renderItem={(props) =>
                    <CarouselItem
                        key={props.index}
                        owner={props.item.user.name}
                        ownerImage={props.item.user.picture}
                        price={props.item.price}
                        title={props.item.title}
                        subtitle={props.item.shortDescription}
                        image={props.item.blobPaths[0]}/>
                }
                />
                <View
                    style={styles.pagingControlsContainer}>
                    
                    {props.items.map((_, i) => {

                        return <CarouselPagination
                            key={i}
                            index={i}
                            progressValue={progressValue}
                            isActive={activePaginationIndex === i}/>
                    })}

                </View>
        </View>
    );
}


export default Carousels;