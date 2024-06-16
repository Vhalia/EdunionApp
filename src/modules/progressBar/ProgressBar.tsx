import { StyleSheet, View } from "react-native"
import Animated, { Easing, Extrapolation, SharedValue, clamp, interpolate, measure, useAnimatedProps, useAnimatedRef, useAnimatedStyle, withClamp, withTiming } from "react-native-reanimated"
import { ColorConstants } from "../../constants/ThemeConstants";

const ProgressBar = (props: ProgressBarProps) => {
    const progressAnimatedRef = useAnimatedRef<Animated.View>();

    const height = props.height ?? 20

    const animatedStyle = useAnimatedStyle(() => {
        const measurement = measure(progressAnimatedRef);
        const measuredWidth = measurement?.width ?? 1

        const widthValue = interpolate(
            props.progress.value,
            [0, 1],
            [0, measuredWidth], Extrapolation.CLAMP)

        const width = withTiming(
            widthValue,
            {
                duration: 300,
                easing: Easing.out(Easing.ease)
            })

        return {
            width: width,
        };
    });

    return (
        <View
            style={[
                styles.progressBar,
                {backgroundColor: props.backgroundColor, height: height},
            ]}
            ref={progressAnimatedRef}>
                
            <Animated.View
                style={[
                    styles.progress,
                    {backgroundColor: props.progressColor},
                    animatedStyle]}/>
        </View>
    )
}

interface ProgressBarProps {
    progress: SharedValue<number>,
    backgroundColor: string,
    progressColor: string,
    height?: number
}

const styles = StyleSheet.create({
    progressBar: {
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
      },
      progress: {
        height: '100%',
    }
})

export default ProgressBar