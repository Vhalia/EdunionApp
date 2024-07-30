import { Dimensions, LayoutChangeEvent, ScrollView, StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import CarouselProps from "./props/CarouselProps";
import styles from "./style/carouselStyle";
import LeftArrowSVG from "../../../images/leftArrow.svg"
import RightArrowSVG from "../../../images/rightArrow.svg"
import { ColorConstants } from "../../constants/ThemeConstants";
import { useEffect, useRef, useState } from "react";
import CarouselPagination from "../carousel/carouselPagination/CarouselPagination";

const CarouselV2 = (props : CarouselProps) => {
    
    const setInitialData = () => {
        if (props.data.length == 0)
            return []

        if (props.data.length == 1)
            return props.data

        return [
            props.data[props.data.length-1],
            ...props.data,
            props.data[0],
        ]
    }

    let navigationArrowHorizontalPosition = props.navigationArrowHorizontalPosition ?? "inside"
    let navigationArrowVerticalPosition = props.navigationArrowVerticalPosition ?? "center" 
    let navigationArrowSize = props.navigationArrowSize ?? 15
    let displayNavigationArrows = props.data.length > 1 && props.displayNavigationArrows
    let paginationVertialPosition = props.paginationVerticalPosition ?? "inside"    
    let startingIndex = (props.data.length <= 1) ? 0 : 1

    const [datas] = useState(setInitialData());
    const [currentIndex, setCurrentIndex] = useState(startingIndex)
    const [width, setWidth] = useState(Dimensions.get("window").width);
    const scrollViewRef = useRef<ScrollView>(null);
    
    // const separatorWidth = props.spacing ?? 0
    // const zoom = separatorwidth * (props.zoom ?? 0)
    // const separatorWidth = 20
    // const zoom = separatorWidth * 4
    // const offset = 110
    // const itemPos = (width - offset) //multiply it by index

    const navigationArrowsStyle = () => {
        let style : StyleProp<ViewStyle> = {}
        
        if (navigationArrowHorizontalPosition == "inside") {
            style = {...style, ...styles.navigationArrowsInside}
        }
        
        if (navigationArrowVerticalPosition == "center") {
            style = {...style, ...styles.navigationArrowsCenter}            
        }
        
        return {...styles.navigationArrows, ...style};
    }

    const paginationStyle = () => {
        let style : StyleProp<ViewStyle> = {}

        if (paginationVertialPosition == "inside") {
            style = {...style, ...styles.paginationInside}
        }
        
        return {...styles.paginationContainer, ...style};
    }
    const onPressScrollLeft = () => {
        scrollTo(currentIndex - 1, true)
    }
    
    const onPressScrollRight = () => {
        scrollTo(currentIndex + 1, true)
    }
    
    const scrollTo = (index: number, animated: boolean) => {
        let newIndex = index        
        if (index == datas.length - 1)
        {
            newIndex = 1
        }
        else if (index == 0)
        {
            newIndex = datas.length-2
        }
        
        const to = newIndex * width
        
        scrollViewRef.current?.scrollTo({x: to, y: 0, animated: animated})
        
        setCurrentIndex(newIndex)
    }
            
    const onLayoutChangeContainer = (event: LayoutChangeEvent) => {
        setWidth(event.nativeEvent.layout.width);
    }
    
    const onScrollEnd = ({nativeEvent} : any) => {
        let index = Math.round(nativeEvent.contentOffset.x / width);
        
        setCurrentIndex(index)
    }
    
    useEffect(() => {    
        if (props.data.length <= 1)
            return;
        
        scrollTo(currentIndex, false)
    }, [currentIndex])
            

    return (
        <View
            onLayout={onLayoutChangeContainer}
            style={[styles.mainContainer, props.style]}>

            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                onMomentumScrollEnd={onScrollEnd}
                showsHorizontalScrollIndicator={false}
                overScrollMode="never"
                style={{backgroundColor: props.backgroundColor ?? ColorConstants.blackMainColor}}
                //set scroll position to the first item
                onLayout={() => scrollViewRef.current?.scrollTo({x: startingIndex * width, y: 0, animated: false})}>

                {datas.map((item, index) => (
                    <View key={index} style={[styles.itemContainer]}>
                        {/* <View style={{width: separatorWidth, backgroundColor: 'transparent'}}></View> */}
                        <View /*style={[{width: width - separatorWidth - zoom}]}*/>
                            {props.renderItem(item, (index-startingIndex)%props.data.length)}
                        </View>
                    </View>
                ))}

            </ScrollView>

            {displayNavigationArrows ??
                <View 
                    style={navigationArrowsStyle()}>

                    <TouchableOpacity
                        onPress={onPressScrollLeft}>
                        <LeftArrowSVG
                            color={ColorConstants.whiteMainColor}
                            width={navigationArrowSize}
                            height={navigationArrowSize}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onPressScrollRight}>
                        <RightArrowSVG
                            color={ColorConstants.whiteMainColor}
                            width={navigationArrowSize}
                            height={navigationArrowSize}/>
                    </TouchableOpacity>

                </View>
            }

            {props.data.length > 1 && <View style={paginationStyle()}>
                {props.data.map((_, i) => {

                    return <CarouselPagination
                        key={i}
                        index={i}
                        isActive={(currentIndex-startingIndex) % props.data.length === i}/>
                })}
            </View>}
        </View>
    );
}

export default CarouselV2;