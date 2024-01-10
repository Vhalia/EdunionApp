import CarouselPaginationProps from "./props/props";
import Animated, { Easing, ReduceMotion, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

const CarouselPagination = (props: CarouselPaginationProps) => {
    const width = useSharedValue(10)
    const opacity = useSharedValue(0.5)
    
    const activeAnimatedStyle = useAnimatedStyle(() => {
        const widthAnimConfig = {
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            reduceMotion: ReduceMotion.System,
        }

        const opacityAnimConfig = {
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            reduceMotion: ReduceMotion.System,
        }

        return {
            width: withTiming(
                width.value + (props.isActive ? 10 : 0),
                widthAnimConfig),
            opacity: withSpring(
                opacity.value + (props.isActive ? 1 : 0),
                opacityAnimConfig),
        }
    })

    return (
        <Animated.View
            key={props.index}
            style={[{
                height: 10,
                backgroundColor: "white",
                borderRadius: 5
            }, activeAnimatedStyle]}
        />
    )
}


export default CarouselPagination;