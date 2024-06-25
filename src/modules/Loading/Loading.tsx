import { useEffect } from "react";
import { StyleSheet, View } from "react-native"
import Animated, { Easing, useAnimatedProps, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { ColorConstants } from "../../constants/ThemeConstants";

const Loading = (props: LoadingProps) => {
    const progress = useSharedValue(0);
    const rotation = useSharedValue(0);

    useEffect(() => {
        progress.value = withTiming(0.6, { duration: 1000 })

        progress.value = withRepeat(
            withSequence(
                withTiming(0.7, {duration: 800}),
                withTiming(0.1, {duration: 2000})
            ),
            -1,
            true
        )

        rotation.value = withRepeat(
            withTiming(
                360,
                {duration: 900, easing: Easing.linear}
            ),
            -1,
            false
        )
    }, [])

    const radius = props.radius ?? 20
    const strokeWidth = props.strokeWidth ?? 3
    const circumference = radius * 2 * Math.PI

    const AnimatedCircle = Animated.createAnimatedComponent(Circle)

    const animatedCircleProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: circumference * (1 - progress.value)
        }
    }, [])

    const animatedContainer = useAnimatedStyle(() => {
        return {
            transform: [{rotate: `${rotation.value}deg`}]
        }
    }, [])

    
    return (
        <Animated.View style={[styles.container, animatedContainer]}>
            <Svg width={radius * 2} height={radius * 2}>
                <AnimatedCircle
                    cx={radius}
                    cy={radius}
                    r={radius - strokeWidth / 2}
                    strokeWidth={strokeWidth}
                    stroke={ColorConstants.whiteMainColor}
                    fill={ColorConstants.transparent}
                    strokeDasharray={circumference}
                    animatedProps={animatedCircleProps}
                />
            </Svg>
        </Animated.View>
    );
}

interface LoadingProps {
    radius?: number,
    strokeWidth?: number
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Loading